import { getMod11ControlDigitAutoWeights } from './utils';
import { generateUniqueFnrList, getSecondControlDigit } from './FnrPage/fnr-utils';

describe('test', () => {
    test('en test', () => {
        (generateUniqueFnrList(10000) as string[]).forEach((it) => {
            const withoutControlDigit = it.slice(0, -1);
            const oldControlDigit = Number.parseInt(it[it.length - 1]);
            const newControlDigit = getMod11ControlDigitAutoWeights(
                withoutControlDigit.split('').map((it) => Number.parseInt(it))
            );
            console.log(newControlDigit, oldControlDigit)
            expect(newControlDigit).toEqual(oldControlDigit);
        });
    });
});
