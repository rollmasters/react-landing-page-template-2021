import { ProductServiceInterface } from "./ServiceInterface";
import { MockService } from "./MockService";
import { RealService } from "./RealService";
import {istest} from "../settings/urlsettings";

export class ServiceFactory {
    static getService(): ProductServiceInterface {
        return istest ? new MockService() : new RealService();
    }
}
