/*
 * Definition of the Configuration format for the parsing and transpiling to and from lua scripts to JSON.
 * This file will change as the complexity of the configuration options specified grows.
 */

export class ConfigurationFormat {
    name: string;
    description: string;
    
    push: {
        top: number;
        mid: number;
        bot: number;
    };
    farm: {
        top: number;
        mid: number;
        bot: number;
    };
    defend: {
        top: number;
        mid: number;
        bot: number;
    };
    roam: number;
    roshan: number;
}