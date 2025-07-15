export class CreateMediaDto {
  file: Express.Multer.File
  id: string
  script_id: string
}

export class DemographicDto {
  age: string;
  sex: Sex;
  ethnicity: Ethnicity;
  nativeSpeaker: boolean;
}

const enum Ethnicity {
  Asian,
  AsianBritish,
  Black,
  BlackBritish,
  Caribbean,
  African,
  Mixed,
}

const enum Sex {
  Male,
  Female,
}
