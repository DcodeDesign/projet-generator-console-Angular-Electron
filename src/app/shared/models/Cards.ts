import {DeserializabeModel} from './deserializabe.model';

export class Cards implements DeserializabeModel {
    name: string;
    idBoard: string;
    idList: string;
    closed: boolean;

    constructor() {
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
