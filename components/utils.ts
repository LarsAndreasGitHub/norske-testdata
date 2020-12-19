import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const formatDayjs = dayjs;

export const classNames = (...names: (string | undefined | null)[]): string => {
    return names
        .filter(name => !!name)
        .filter(name => name.length > 0)
        .join(' ');
};
