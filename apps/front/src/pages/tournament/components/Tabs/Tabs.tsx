import { ITour } from '@tennis-stats/types';
import { useAtom } from 'jotai';
import { tabsAtom } from '../../state/Tabs.state';
import Styled from './Tabs.styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface IProps {
  tours: ITour[];
  showPlayoffTab?: boolean;
}

function TournamentTabs(props: IProps) {
  const [tabsState, setTabsState] = useAtom(tabsAtom);

  return (
    <Styled.Tabs
      textColor="inherit"
      variant={'scrollable'}
      scrollButtons={false}
      value={tabsState}
      onChange={(e: unknown, index: number) => setTabsState(index)}
    >
      {props.tours
        .filter((tour) => !tour.playOffStage)
        .map((tour, index) => (
          <Styled.TabItem
            key={`tour-tab-${tour.id}`}
            value={index}
            disableRipple
            label={`Тур № ${tour.number}`}
          />
        ))}

      {props.showPlayoffTab && (
        <Styled.PlayOffTabItem
          value={-1}
          disableRipple
          label={'Плей-офф'}
          icon={<EmojiEventsIcon />}
          iconPosition="start"
        />
      )}
    </Styled.Tabs>
  );
}

export default TournamentTabs;
