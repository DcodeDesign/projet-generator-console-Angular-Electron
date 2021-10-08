import {DeserializabeModel} from './deserializabe.model';

export class Boards implements DeserializabeModel {

    id: string;
    url: string;
    name: string;
    private _prefs: {
        backgroundImage : string;
    };

    constructor() {
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
