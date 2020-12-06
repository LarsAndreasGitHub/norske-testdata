export const classNames = (...names: (string | undefined | null)[]): string => {
    return names
        .filter(name => !!name)
        .filter(name => name.length > 0)
        .join(' ');
};
