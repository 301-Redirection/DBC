import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {
    ConfigurationFormat,
    Condition,
    CompoundCondition,
} from '../services/ConfigurationFormat';

@Injectable()
export class TeamDesiresService {

    constructor() { }

    public getDefaultConfiguration(): ConfigurationFormat {
        return new ConfigurationFormat();
    }

    public newCondition(): Condition {
        return new Condition();
    }

    public newCondGroup(): CompoundCondition {
        return new CompoundCondition();
    }

}
