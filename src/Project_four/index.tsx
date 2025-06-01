import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

const initialGameState = Array.from({ length: 9 }, () => 'empty');

const winningCombinations = [
  [0, 1, 2], // Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6],
];

const TicTacToe = () => {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState<string[]>(initialGameState);

  const checkIsWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        gameState[a] !== 'empty' &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        setGameWinner(`${gameState[a]} won the game! 🥳`);
        return; // Exit the function as there's a winner
      }
    }

    if (!gameState.includes('empty')) {
      setGameWinner('Game Draw... ⌛️');
    }
  };

  const onChangeItem = (index: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }

    if (gameState[index] === 'empty') {
      gameState[index] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFFFFF',
      });
    }
    checkIsWinner();
  };

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(initialGameState);
  };

  return (
    <>
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnText}>
            Player {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}

      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload the game'}
        </Text>
      </Pressable>
    </>
  );
};

export default TicTacToe;

const styles = StyleSheet.create({
  playerInfo: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 4,
    paddingVertical: 10,
    marginVertical: 14,
    marginHorizontal: 15,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 15,
  },
  card: {
    height: 100,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 35,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
