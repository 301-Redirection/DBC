import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {
    ConfigurationFormat,
    Condition,
    CompoundCondition,
} from '../ConfigurationFormat';

@Injectable()
export class TeamDesiresService {

    constructor() { }

    public getDefaultConfiguration(): ConfigurationFormat {
        return new ConfigurationFormat();
    }

    public newCondition(): Condition {
        return {
            trigger: null,
            operator: null,
            conditional: null,
            action: null,
            value: null,
        };
    }

    public newCondGroup(): CompoundCondition {
        return {
            conditions: [],
            logicalOperators: [],
        };
    }

}
