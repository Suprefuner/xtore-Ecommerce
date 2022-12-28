import styled from "styled-components"

const FormRow = ({
  type,
  name,
  labelText = name,
  value,
  handleChange,
  showPassword,
  children,
  className,
  disabled = false,
  accept,
}) => {
  const optionalArr = ["firstName", "birthday"]
  const isOptional = optionalArr.includes(name)

  return (
    <Wrapper className={className}>
      <label htmlFor={name}>
        {labelText}
        {isOptional ? <span className="text-sm"> (optional)</span> : null}
      </label>
      <input
        type={showPassword ? "text" : type}
        name={name}
        id={name}
        value={value}
        placeholder={
          type === "password"
            ? "at least 8 characters, 1 lowercase, 1 uppercase and 1 number"
            : null
        }
        onChange={handleChange}
        pattern={
          type === "password"
            ? "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-#$.%&!_*]).{8,16}$"
            : undefined
        }
        disabled={disabled}
        accept={accept}
      />
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;

  label {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }
`

export default FormRow
