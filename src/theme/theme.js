import React, { useContext, useState, createContext } from 'react';
const ThemeContext = createContext();

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState('dark');
    return (
        <div>
            <ThemeContext.Provider value={[theme, setTheme]}>
                {props.children}
            </ThemeContext.Provider>
        </div>
    );
}

export const useTheme = () => {
  return useContext(ThemeContext);
}
