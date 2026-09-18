'use client';

import React from 'react';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { buttonVariants } from './button';
import { InputGroup, InputGroupButton, InputGroupInput } from './input-group';

function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleIcon = showPassword ? <TbEyeOff /> : <TbEye />;

  return (
    <InputGroup>
      <InputGroupInput type={showPassword ? 'text' : 'password'} {...props} />
      <InputGroupButton
        className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        onClick={() => setShowPassword(!showPassword)}
      >
        {toggleIcon}
      </InputGroupButton>
    </InputGroup>
  );
}

export default PasswordInput;
