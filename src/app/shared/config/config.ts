export class Config {
    /*
        https://api.trello.com/1/members/me/boards?key=${this.key}&token=${this.token}
            token: '8598137111cdb86e646ec270ede068bc70a71c5bf067fea7094d12126c7454e7';
            key : '541096b6502311e3fa117ffe5e1a3cb8';
     */

    /*
        https://api.trello.com/1/
            members/me/boards?key=541096b6502311e3fa117ffe5e1a3cb8&token=8598137111cdb86e646ec270ede068bc70a71c5bf067fea7094d12126c7454e7 */
    /*       https://api.trello.com/1/members/thomasgravy/boards?key=541096b6502311e3fa117ffe5e1a3cb8&token=8598137111cdb86e646ec270ede068bc70a71c5bf067fea7094d12126c7454e7 */

    // https://api.trello.com/1/boards/55200f7838ac97205d36e6d3?key=541096b6502311e3fa117ffe5e1a3cb8&token=8598137111cdb86e646ec270ede068bc70a71c5bf067fea7094d12126c7454e7

    public static get SERVER_URL() {
        return 'https://api.trello.com/1/';
    }

    public static get KEY_TRELLO() {
        return '?key=541096b6502311e3fa117ffe5e1a3cb8';
    }

    public static get TOKEN_TRELLO() {
        return '&token=8598137111cdb86e646ec270ede068bc70a71c5bf067fea7094d12126c7454e7';
    }

    public static get KEY_AND_TOKEN_TRELLO() {
        return Config.KEY_TRELLO + Config.TOKEN_TRELLO;
    }

    public static get MEMBERS_TRELLO() {
        return 'thomasgravy';
    }

    /* https://api.trello.com/1/members/thomasgravy/boards?key=541096b6502311e3fa117ffe5e1a3cb8&token=8598137111cdb86e646ec270ede068bc70a71c5bf067fea7094d12126c7454e7*/
    public static BOARDS_TRELLO() {
        return Config.SERVER_URL + 'members/' + Config.MEMBERS_TRELLO +'/boards' +  Config.KEY_AND_TOKEN_TRELLO;
    }

    /* https://api.trello.com/1/boards/55200f66d04ffeb49383643b/lists?key=541096b6502311e3fa117ffe5e1a3cb8&token=8598137111cdb86e646ec270ede068bc70a71c5bf067fea7094d12126c7454e7*/
    public static LISTS_TRELLO(idboard: string) {
        return Config.SERVER_URL + 'boards/' + idboard +'/lists' +  Config.KEY_AND_TOKEN_TRELLO;
    }

    /* https://api.trello.com/1/lists/541096b6502311e3fa117ffe5e1a3cb8/cards?key=541096b6502311e3fa117ffe5e1a3cb8&token=8598137111cdb86e646ec270ede068bc70a71c5bf067fea7094d12126c7454e7*/
    public static CARDS_TRELLO(idLists: string) {
        return Config.SERVER_URL + 'lists/' + idLists +'/cards' +  Config.KEY_AND_TOKEN_TRELLO;
    }

}
