import { arrayIntersections } from '@tennis-stats/helpers';
import { ITournament } from '@tennis-stats/types';
import { ArrayNotEmpty, IsNumber } from 'class-validator';

class TournamentRegistrationDto {
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  usersIds: number[];

  public validate(tournament: ITournament) {
    const { registeredUsers, playersCount } = tournament;

    const joinedUsersIds = registeredUsers.map((user) => user.id);
    const idsIntersections = arrayIntersections(this.usersIds, joinedUsersIds);

    const intersectedUsers = registeredUsers
      .filter((user) => idsIntersections.includes(user.id))
      .map((user) => user.nickname);

    return {
      isUsersLengthExceed: registeredUsers.length + this.usersIds.length > playersCount,
      intersectedUsers,
    };
  }
}

export default TournamentRegistrationDto;
