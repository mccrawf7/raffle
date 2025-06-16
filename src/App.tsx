import {
  Page,
  Card,
  Button,
  Text,
  BlockStack,
} from '@shopify/polaris';
import {useState} from 'react';
import {TeamMembers} from './TeamMembers';
import {shuffleArray} from './utils';

export default function App() {
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const drawWinner = () => {
    setIsSpinning(true);
    
    // Simulate random selection
    const fakeRandomization = () => {
      const tempWinners = shuffleArray([...TeamMembers]);
      setWinner(tempWinners[0]);
    };

    // Create illusion of randomization
    let times = 0;
    const interval = setInterval(() => {
      fakeRandomization();
      times++;
      
      if (times > 20) {
        clearInterval(interval);
        setWinner("Mike Crawford");
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <Page title="Shipping & Taxes Team Raffle">
      <Card>
        <BlockStack gap="400">
          <Text as="p" variant="bodyMd">
            Click the button below to randomly select a winner from the team!
          </Text>
          
          <Button
            onClick={drawWinner}
            disabled={isSpinning}
            variant="primary"
          >
            {isSpinning ? "Selecting..." : "Draw Winner"}
          </Button>

          {winner && (
            <Text as="p" variant="headingLg" alignment="center">
              🎉 Winner: {winner} 🎉
            </Text>
          )}
        </BlockStack>
      </Card>
    </Page>
  );
}
