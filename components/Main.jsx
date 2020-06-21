import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput, CheckBox } from "react-native";

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
    const [item, setItem] = useState({ content: "", done: false });

    function addItem(item) {
        if (item.content.length > 0) {
            let l = list;
            l.push(item);
            setList(l);
            setItem("");
        }
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
            <View style={{ ...styles.actionView }}>
                <TextInput
                    placeholder="Item"
                    placeholderTextColor="#111"
                    onChangeText={(txt) => {
                        let newItem = { content: txt, done: false };
                        setItem(newItem);
                    }}
                    value={item.content}
                    onSubmitEditing={() => addItem(item)}
                    style={{ ...styles.textInput }}
                />
                {/* <Button title="Add New" onPress={() => addItem(item)} /> */}
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        margin: 20,
        marginTop: 30,
    },
    actionView: {},
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
        height: 50,
        borderTopWidth: 1,
        borderColor: "#fff",
        color: "#000",
        marginBottom: 10,
        backgroundColor: "#ffffffbb",
        padding: 10,
    },
    addBtn: {},
};

export default Main;
