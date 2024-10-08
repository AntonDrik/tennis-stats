import { ArrayNotEmpty, IsNumber } from 'class-validator';

class TournamentRegistrationDto {
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  usersIds: number[];
}

export default TournamentRegistrationDto;
