import React, { useEffect, useRef } from 'react'
import { Input as InputChakra } from "@chakra-ui/react";
import { useField } from '@unform/core'
interface Props {
  name: string
  label?: string
}
type InputProps = JSX.IntrinsicElements['input'] & Props
export function Input({ name, label, type, placeholder, step }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <InputChakra
        variant='filled'
        placeholder={placeholder}
        bg='gray.900'
        _hover={{
          bg: "gray.800"
        }}
        py={6}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        type={type}
        step={step}
      />
      {error && <span>{error}</span>}
    </>
  )
}