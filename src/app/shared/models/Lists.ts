import {DeserializabeModel} from './deserializabe.model';

export class Lists implements DeserializabeModel {
    id: string;
    name: string;
    closed: string;

    constructor() {
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
