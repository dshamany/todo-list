import React, { useState } from "react";
import {
    View,
    Button,
    Text,
    TextInput,
    CheckBox,
    Modal,
    TouchableOpacity,
    FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function ListItem({ item, idx, remove, toggleDone }) {
    return (
        <TouchableOpacity onPress={() => toggleDone(idx)}>
            <View style={{ ...styles.listItem }}>
                <CheckBox value={item.done} style={{ ...styles.checkbox }} />
                <Text style={{ ...styles.textLabel }}>{item.content}</Text>
                <Button title="X" color="#FF4400" onPress={() => remove(idx)} />
            </View>
        </TouchableOpacity>
    );
}

function Main() {
    const [list, setList] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [item, setItem] = useState({ content: "", done: false });
    const [calendarIsVisible, setCalendarIsVisible] = useState(false);
    const [date, setDate] = useState(new Date());

    function addItem(item) {
        let l = list;
        item.idx = list.length;
        item.date = date;
        if (item.content && item.content.length > 0) {
            l.push(item);
            setList(l);
        }
        setItem({});
        setDate(new Date());
        setModalActive(false);
    }

    function deleteItem(idx) {
        let l = list;
        l.splice(idx, 1);
        setList(l);
        setItem({});
    }

    function toggleDone(idx) {
        let l = list;
        let li = list[idx];
        let isDone = list[idx].done;
        isDone ? (li.done = false) : (li.done = true);
        setList(l);
        setItem({});
    }

    var index = 0;

    return (
        <View style={{ ...styles.container }}>
            <FlatList
                key={index}
                renderItem={() => (
                    <ListItem
                        item={list[index]}
                        idx={index++}
                        toggleDone={toggleDone}
                        remove={deleteItem}
                    />
                )}
                data={list}
                style={{ ...styles.container }}
            />
            <View
                style={{
                    ...styles.actionView,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: 30,
                }}
            >
                <Button
                    title="Add New Item"
                    onPress={() => {
                        setModalActive(true);
                    }}
                />
            </View>
            <Modal visible={modalActive} transparent={true}>
                <View style={{ ...styles.partialView }}>
                    <TextInput
                        autoFocus={true}
                        placeholder="Item"
                        placeholderTextColor="#bbb"
                        onChangeText={(txt) => {
                            let newItem = { content: txt, done: false };
                            setItem(newItem);
                        }}
                        value={item.content}
                        onSubmitEditing={() => addItem(item)}
                        style={{ ...styles.textInput }}
                    />
                    {calendarIsVisible && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={"date"}
                            is24Hour={true}
                            display="calendar"
                            minimumDate={new Date("2000-01-01")}
                            onChange={(d) => {
                                setCalendarIsVisible(false);
                                setDate(new Date(d.nativeEvent.timestamp));
                            }}
                            onTouchCancel={() => setDate(new Date())}
                        />
                    )}
                    <View
                        style={{
                            ...styles.actionView,
                            justifyContent: "space-between",
                            padding: 0,
                            margin: 0,
                            flexDirection: "row",
                        }}
                    >
                        <Button
                            title={date ? date.toDateString() : "Select Date"}
                            onPress={() => {
                                !calendarIsVisible &&
                                    setCalendarIsVisible(true);
                            }}
                            color="gray"
                        />
                        <Button
                            title="Done"
                            onPress={() => {
                                addItem(item);
                                setCalendarIsVisible(false);
                            }}
                            color="green"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: "#111",
        height: "100%",
        padding: 5,
    },
    actionView: {
        padding: "5%",
        marginBottom: 30,
    },
    checkbox: {
        alignSelf: "center",
    },
    listView: {
        height: "100%",
        marginLeft: 5,
        marginRight: 5,
    },
    listItem: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5,
        backgroundColor: "#000",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#999",
        marginBottom: 10,
    },
    textLabel: {
        paddingLeft: 10,
        paddingRight: 10,
        flexShrink: 1,
        color: "#fff",
        fontSize: 16,
    },
    descriptionText: {
        fontSize: 12,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#777",
        borderRadius: 5,
        color: "#fff",
        marginBottom: 10,
        backgroundColor: "#111111bb",
        padding: 10,
        marginTop: 10,
    },
    doneBtn: { alignSelf: "flex-end" },
    partialView: {
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#333333ff",
        padding: "5%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomWidth: 3,
        borderColor: "#000",
        marginTop: 0,
    },
};

export default Main;
