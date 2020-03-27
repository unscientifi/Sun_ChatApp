// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {
    props: ['msg'],

    template: `
        <p class="room-message" :class="{ 'my-message' : matchedID }">
            {{msg.message.name}} has joined the chat!
        </p>
    `,

    data: function() {
        // nothin here yet, but there will be
        return { 
            matchedID: this.$parent.socketID == this.msg.id
        }
    }
}