import { Location } from "../../domain/location";

export abstract class LocationRepositoryInterface{

abstract registerlocation(locationData: Location): Promise<Location>
abstract list(): Promise<Location[]> 

}

export const LOCATION_REPO_TOKEN = Symbol()