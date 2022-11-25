/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
import {ethers} from 'ethers';
import Web3 from 'web3';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [address, setAddress] = useState('');
  const [info, setInfo] = useState('');
  MUMBAI_RPC_URL =
    'https://polygon-mumbai.g.alchemy.com/v2/t2wYs37CplWRMEXFwLYnOh5-USLV2C5k'; // this is for test purpose and its a free account
  PRIVATE_KEY =
    'a0552a76220b0e404bd71f727d668e6b440dacee3791518a19a022221d723236'; // yes steal all my funds

  const sendTx = async () => {
    try {
      setIsLoading(true);
      setInfo(`Preparing`);

      const web3 = new Web3(MUMBAI_RPC_URL);
      const myAddress = '0xC3A3362DC30588a027767063459dC533Dc4A421a';
      // 0x7f6311adeb83cb825250b2222656d26223d7ecb4;
      const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

      const transaction = {
        to: address,
        value: ethers.utils.parseEther(value), // 1 ETH
        gas: 30000,
        nonce: nonce,
      };

      const signedTx = await web3.eth.accounts.signTransaction(
        transaction,
        PRIVATE_KEY,
      );
      setInfo(`Sending ${value} matic to this ${address}`);

      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (error, hash) {
          if (!error) {
            setInfo(
              `🎉 Hash: 
              ${hash}
              `,
            );
          } else {
            setInfo(error.toString());
          }
        },
      );

      setIsLoading(false);
    } catch (e) {
      setInfo(`Error: ${e}`);
      setIsLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.sectionTitle}>
        <Text>To</Text>
      </View>

      <View style={styles.sectionInput}>
        <TextInput
          onChangeText={setAddress}
          editable={!isLoading}
          keyboardType={'address'}
          selectTextOnFocus
        />
      </View>

      <View style={styles.sectionTitle}>
        <Text>Value</Text>
      </View>

      <View style={styles.sectionInput}>
        <TextInput
          onChangeText={setValue}
          editable={!isLoading}
          keyboardType={'address'}
          selectTextOnFocus
        />
      </View>

      <View style={styles.sectionTitle}>
        <Text>{info}</Text>
      </View>

      <View style={styles.sectionInput}>
        <Button
          title={isLoading ? 'Sending Tx' : 'Submit'}
          onPress={sendTx}></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 24,
    marginTop: 24,
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    margin: 12,
  },
  sectionInput: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    margin: 24,
    backgroundColor: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
