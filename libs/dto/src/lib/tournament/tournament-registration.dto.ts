import { ArrayNotEmpty, IsPositive } from 'class-validator';

class TournamentRegistrationDto {
  @IsPositive({ each: true })
  @ArrayNotEmpty()
  usersIds: number[];
}

export default TournamentRegistrationDto;
