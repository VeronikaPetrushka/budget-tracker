import { View } from "react-native"
import Budget from "../components/Budget"

const BudgetScreen = () => {
    return (
        <View style={styles.container}>
            <Budget />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default BudgetScreen;