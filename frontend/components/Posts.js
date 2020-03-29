import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts, addTime, isTrue, counterAction, counterActionTwo} from '../src/actions/postActions';

class Posts extends Component {

    componentDidMount() {
        // this.props.fetchPosts();
        // this.props.addTime();
        this.props.isTrue();
    }

    increaseCounter = () => (this.props.counterAction(this.props.counter));
    decreaseCounter = () => (this.props.counterActionTwo(this.props.counter));

    render() {

        const styles = StyleSheet.create({
            text: {
                color: 'black'
            }
        });
        return (
            <View>
                {/* <FlatList data={this.props.posts} renderItem={({item}) => (
                   <Text>{item.title}</Text> 
                )} ></FlatList> */}
                <Text>{this.props.person.name}</Text>
             <TouchableOpacity onPress={this.increaseCounter}>
                 <Text>Increase</Text>
             </TouchableOpacity>  
             <Text>{this.props.counter}</Text>
             <TouchableOpacity onPress={this.decreaseCounter}>
                 <Text>Decrease</Text>
             </TouchableOpacity>
            </View>
        )
    }
}
Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    time: state.posts.time,
    person: state.posts.object,
    counter: state.posts.counter
});

export default connect(mapStateToProps, { fetchPosts, addTime, isTrue, counterAction, counterActionTwo })(Posts);