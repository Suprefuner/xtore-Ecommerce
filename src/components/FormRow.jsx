import styled from "styled-components"

const FormRow = ({
  type,
  name,
  labelText = name,
  value,
  handleChange,
  showPassword,
  className,
  disabled = false,
  accept,
  children,
}) => {
  const optionalArr = ["firstName", "birthday"]
  const isOptional = optionalArr.includes(name)

  if (type === "select") {
    return (
      <Wrapper className={className}>
        <label htmlFor={name}>
          {labelText}
          {isOptional ? <span className="text-sm"> (optional)</span> : null}
        </label>
        <select
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="null">--</option>
          <option value="mr">mr.</option>
          <option value="ms">ms.</option>
          <option value="mrs">mrs.</option>
        </select>
        {children}
      </Wrapper>
    )
  }

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

  *:disabled {
    background-color: #eee;
    color: #666;
  }

  label {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }

  select {
    border-radius: var(--border-radius-md);
    height: 100%;
    border: 1px solid black;
    padding-inline: 1rem;
    outline: none;
    text-transform: uppercase;

    &:focus {
      outline: none;
    }
  }
`

export default FormRow
