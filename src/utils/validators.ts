

const validNumber = ({ value, setValue}: { value: string, setValue: (value: any) => any }): void => {
    const lastCharacterIndex = value.length > 0 ? value.length - 1 : 0;
    if (parseInt(value[lastCharacterIndex]) >= 0 || value.length === 0) {
        setValue(value);
    }
}

export {
    validNumber,
}