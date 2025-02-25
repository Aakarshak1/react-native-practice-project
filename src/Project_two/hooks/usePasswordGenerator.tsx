import { useCallback, useState } from 'react';
import {
  digitChars,
  initialOptions,
  InitialOptionsType,
  lowerCaseChars,
  specialChars,
  upperCaseChars,
} from '../constant';

const createPassword = (characters: string, passwordLength: number) => {
  let result = '';
  for (let i = 0; i < passwordLength; i++) {
    const characterIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(characterIndex);
  }
  return result;
};

export default function usePasswordGenerator() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [options, setOptions] = useState(initialOptions);

  const generatePasswordString = useCallback(
    (passwordLength: number) => {
      let characterList = '';

      if (options.uppercase) characterList += upperCaseChars;
      if (options.lowercase) characterList += lowerCaseChars;
      if (options.numbers) characterList += digitChars;
      if (options.symbols) characterList += specialChars;

      if (!characterList) return;

      const generatedPassword = createPassword(characterList, passwordLength);

      setPassword(generatedPassword);
      setIsPasswordGenerated(true);
    },
    [options], // Added `options` as a dependency
  );

  const resetPasswordState = useCallback(() => {
    setPassword('');
    setIsPasswordGenerated(false);
    setOptions(initialOptions);
  }, []);

  const toggleOption = useCallback((option: string) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [option]: !prevOptions[option as keyof InitialOptionsType],
    }));
  }, []);

  return {
    options,
    password,
    isPasswordGenerated,
    toggleOption,
    resetPasswordState,
    generatePasswordString,
  };
}
