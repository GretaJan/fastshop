import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { containerStyles, textStyle } from "../src/styles/GeneralStyles";
import { homeStyles } from "../src/styles/AdditionalStyles";
import { stylesGuest } from "../src/styles/CategoryStyles";
import { colors } from "../src/styles/Colors";
import { productWrap } from "../src/styles/CompareStyles";
import IonIcon from "react-native-vector-icons/dist/Ionicons";

// Components:
import Header from "../utils/models/Header";
import Categories from "./categories/global/Categories";
import ActionIcon from "../utils/models/ActionIcon"; 

class Home extends Component {

  goToSubcategories = (item) => {
    this.props.navigation.push("Subcategories", {categoryId: item.id, name: item.name, background: item.background});
  }

  goToTopNutritionsPage = (link, componentType, componentTitle, requestType) => {
    this.props.navigation.push(link, { componentType: componentType, headerTitle: componentTitle, requestType: requestType });
  }

  render() {

    return (
        <>
          <Header 
            title="Nutritaste"
            navigate={ null }
          />
          <View style={ containerStyles().screenHeightContainerNoHeaderFullHeight }>
            <Text style={ stylesGuest().descriptionText }>
                <Text style={ textStyle().h3 }>Find the best product match for preferred nutrition criteria.</Text>
            </Text>
            <View  style={ homeStyles.mainBlock }>
              <Categories 
                categories={ this.props.categories }
                goToSubcategories={(item) => this.goToSubcategories(item)}
              />
              <View style={ homeStyles.fourBtns }>
                  <View style={ homeStyles.halfWidth }>
                    <View>
                      <View style={ homeStyles.btnWrapOne }>
                          <ActionIcon
                              deactivateFunc={ () => this.goToTopNutritionsPage("TopComponents", 1, "Top Favorite Drinks", "getFavorites") }
                              activateFunc={ null }
                              errorCondition={  null  }
                              errorFunc={ null }
                              mainIcon={null}
                              activeIcon="bottle-wine"
                              iconColor={ colors.mainGrey }
                              activeColorSec={ colors.mainBtnOrange }
                              isActive={ true }
                          />
                      </View>
                      <View style={ homeStyles.btnWrapTwo }>
                          <ActionIcon
                              deactivateFunc={ () => this.goToTopNutritionsPage("TopComponents", 2, "Top Favorite Foods", "getFavorites") }
                              activateFunc={ null }
                              errorCondition={ null }
                              errorFunc={ null }
                              mainIcon={null}
                              activeIcon="food-apple-outline"
                              activeBackground={ null }
                              iconColor={ colors.mainGrey }
                              activeColorSec={ colors.mainBtnGreen }
                              isActive={ true }
                          />
                      </View>
                    </View>
                    <View style={ homeStyles.textWrap }>
                      <View style={ homeStyles.colorWrap }>
                        <Text style={ homeStyles.innerTextWrap }>
                          <Text style={ textStyle().h2 }>Top Favorites</Text>
                        </Text>
                        <Text>Check Out!</Text>
                      </View>
                    </View>
                  </View>
                  <View style={ homeStyles.halfWidth }>
                    <View>
                        <View style={ homeStyles.btnWrapThree }>
                          <ActionIcon
                              deactivateFunc={ () => this.goToTopNutritionsPage("Top Nutritions", "drinks", "Top Food Nutritions", "getNutritions") }
                              activateFunc={ null }
                              errorCondition={ null }
                              errorFunc={ null }
                              mainIcon={ null }
                              activeIcon="bottle-wine"
                              iconColor={ colors.mainBtnOrange }
                              activeColorSec={ colors.mainGrey }
                              isActive={ true }
                          />
                        </View>
                      <View style={ homeStyles.btnWrapFour }>
                          <ActionIcon
                              deactivateFunc={ () => this.goToTopNutritionsPage("Top Nutritions", "food", "Top Drink Nutritions", "getNutritions") }
                              activateFunc={ null }
                              errorCondition={ null }
                              errorFunc={ null }
                              mainIcon={null}
                              activeIcon="food-apple"
                              iconColor={ colors.mainBtnGreen }
                              activeColorSec={ colors.mainGrey }
                              isActive={ true }
                          />
                      </View>
                    </View>
                    <View style={ homeStyles.textWrap }>
                      <View style={ homeStyles.colorWrap }>
                        <View style={ homeStyles.innerTextWrap }>
                          <Text style={ textStyle().h2 }>Top Nutrients</Text>
                        </View>
                        <Text>Check Out!</Text>
                      </View>
                    </View>
                  </View>
              </View>
            </View>
          </View>
        </>
    )
  }
}

const mapStateToProps = state => ({
    categories: state.dataUpload.categories,
})

export default withNavigation(connect(mapStateToProps)(Home))