import {
    Text,
    View,
    Colors,
    Image,
    BaseInput,
    Button,
  } from "react-native-ui-lib";
  import { FlatList } from "react-native";
  import { Controller, useForm } from "react-hook-form";
  import { useState } from "react";
  import { TextInput,Card } from "react-native-paper";
  import { styles } from "../styles/styles";
  import { vehiculo } from "../services/information";
  import {ImageBackground} from  "react-native"

export default function List({navigation,route}){
    const renderCard = ({ item }) => (
        
        <View style={styles.card}>
            <Text style={styles.title}>{item.plate}</Text>
            <Text style={styles.description}>{item.brand}</Text>
            <Text style={styles.description}>{item.state? "disponible":"no disponible"}</Text>
        </View>
    );
return(
  <ImageBackground
  source={{
    uri: "https://firebasestorage.googleapis.com/v0/b/rentacar-352a0.appspot.com/o/backg.jpeg?alt=media&token=95863422-5dbc-4c23-9aa3-7857c8e18508", // Reemplaza esto con la URL de tu imagen de fondo
  }}
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }}
>

<View style={{flex:1,justifyContent: "center",alignItems: "center",flexDirection: "column"}}>
<Image
        style={{ height: "12.5rem", width: "12.5rem" }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/pngegg.png?alt=media&token=8d21b69e-0394-41e3-967b-632ac1ddc284",
        }}
></Image>
<FlatList
                data={vehiculo}
                keyExtractor={(item) => item.plate.toString()}
                renderItem={renderCard}
                />
</View>
</ImageBackground>
)
}
