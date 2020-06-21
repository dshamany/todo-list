import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput, CheckBox, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function ListItem({ item, idx, remove, toggleDone }) {
    return (
        <View style={{ ...styles.listItem }}>
            <CheckBox
                value={item.done}
                style={{ ...styles.checkbox }}
                onTouchEnd={() => toggleDone(idx)}
            />
            <Text style={{ ...styles.textColor }}>{item.content}</Text>
            <Button title="X" color="#FF4400" onPress={() => remove(idx)} />
        </View>
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
        item.date = date;
        console.log(item);
        if (item.content && item.content.length > 0) {
            l.push(item);
            setItem("");
        }
        setList(l);
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

    return (
        <View style={{ ...styles.container }}>
            <View style={{ ...styles.actionView }}>
                <Button
                    title="Add New"
                    onPress={() => {
                        setModalActive(true);
                    }}
                />
            </View>
            <View style={{ ...styles.listView }}>
                {list.map((item, idx) => {
                    return (
                        <ListItem
                            key={"LI" + idx}
                            idx={idx}
                            item={item}
                            remove={deleteItem}
                            toggleDone={toggleDone}
                        />
                    );
                })}
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
                            value={date || null}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            minimumDate={new Date()}
                            onChange={(d) => {
                                setCalendarIsVisible(false);
                                setDate(new Date(d.nativeEvent.timestamp));
                            }}
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
                            title={date.toDateString()}
                            onPress={() => setCalendarIsVisible(true)}
                            color="gray"
                        />
                        <Button
                            title="Done"
                            onPress={() => addItem(item)}
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
        flex: 1,
        margin: 20,
        marginTop: 30,
    },
    actionView: {
        padding: "5%",
    },
    checkbox: {
        alignSelf: "center",
    },
    topContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 30,
    },
    listView: {
        height: "88%",
    },
    listItem: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: "#ffffffbb",
    },
    textColor: {
        padding: 10,
        flexShrink: 1,
        color: "#111",
        fontSize: 18,
    },
    descriptionText: {
        fontSize: 12,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        color: "#000",
        marginBottom: 10,
        backgroundColor: "#ffffffbb",
        padding: 10,
        marginTop: 10,
    },
    doneBtn: { alignSelf: "flex-end" },
    partialView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#ffffffee",
        padding: "5%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 320,
        width: "100%",
    },
};

export default Main;
