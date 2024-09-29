import { IsNumber } from 'class-validator';

class TournamentRegistrationDto {
  @IsNumber({}, { each: true })
  usersIds: number[];
}

export default TournamentRegistrationDto;
