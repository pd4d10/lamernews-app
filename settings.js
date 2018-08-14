import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Switch,
  Picker,
  AsyncStorage,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { LayoutContext, ThemeContext } from './App'
import { MyHeader } from './list'

class Settings extends React.Component {
  state = {
    status: false,
  }

  componentDidMount() {}

  getSettings = async () => {
    const settings = await AsyncStorage.getItem('settings')
    this.setState({ ...settings })
  }

  saveSettings = async data => {
    await AsyncStorage.setItem('settings', JSON.stringify(data))
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#EFEFF4',
          paddingVertical: 20,
        }}
      >
        <TableView>
          <LayoutContext.Consumer>
            {({ layout, setLayout }) => (
              <Section header="LAYOUT STYLE">
                {['iOS', 'Android'].map(item => (
                  <Cell
                    key={item}
                    title={item}
                    accessory={
                      layout === item.toLowerCase() ? 'Checkmark' : undefined
                    }
                    onPress={() => setLayout(item.toLowerCase())}
                  />
                ))}
              </Section>
            )}
          </LayoutContext.Consumer>
          <ThemeContext.Consumer>
            {({ theme, setTheme }) => (
              <Section header="THEME">
                {['Light', 'EchoJS', 'Dark'].map(item => (
                  <Cell
                    key={item}
                    title={item}
                    accessory={
                      theme === item.toLowerCase() ? 'Checkmark' : undefined
                    }
                    onPress={() => setTheme(item.toLowerCase())}
                  />
                ))}
              </Section>
            )}
          </ThemeContext.Consumer>
        </TableView>
        <Section header="ABOUT">
          <Cell
            title="Source Code"
            titleTextColor="#007AFF"
            onPress={() => console.log('open Help/FAQ')}
          />
          <Cell accessory="DisclosureIndicator" title="License (MIT)" />
        </Section>
      </ScrollView>
    )
  }
}

export default createStackNavigator(
  {
    Settings: Settings,
  },
  {
    // initialRouteName: 'Settings',
    navigationOptions: {
      title: 'Settings',
      header: MyHeader,
    },
  },
)
