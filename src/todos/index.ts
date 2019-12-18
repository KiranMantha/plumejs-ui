import { Component, html, useRef, Input, Ref } from "plumejs";

@Component({
    selector: 'todo-list'
})
class TodoList {
    update:any;
    todos:Array<string> = [];
    selectedIndex = -1;
    formProps = {
        todo: '',
        addTodo: this.addTodo.bind(this)
    }

    outEditTodo:any;
    outDeleteTodo:any;

    constructor(){
        this.outEditTodo = this.editTodo.bind(this);
        this.outDeleteTodo = this.deleteTodo.bind(this);
    }

    addTodo(todo:string) {
        if(this.selectedIndex === -1) {
            this.todos.push(todo);
        } else {
            this.todos[this.selectedIndex] = todo;
            this.selectedIndex = -1;
        }
        this.update();
    }

    editTodo(index:number) {
        this.formProps.todo = this.todos[index];
        this.selectedIndex = index;
        this.update();
    }

    deleteTodo(index:number){
        this.todos.splice(index, 1);
        this.update();
    }

    render(){
        return html`
            <div class="d-flex justify-content-center mt-3">
                <div style='width:30rem;'>
                    <todo-form formprops=${ this.formProps }></todo-form>
                    <ul class="list-group list-group-flush">
                        ${
                            this.todos.map((todo, i) => {
                                let item = {
                                    todo: todo,
                                    id: i,
                                    editTodo: this.outEditTodo,
                                    deleteTodo: this.outDeleteTodo
                                }
                                return html`<todo-item class="list-group-item" item=${item}></todo-item>`
                            })
                        }
                    </ul>
                </div>
            </div>
        `
    }
}

@Component({
    selector: 'todo-form'
})
class TodoForm {
    inputRef:Ref<HTMLInputElement> = useRef(null);
    @Input()
    formprops:any = {};

    submit(e:Event){
        e.preventDefault();
        this.formprops.addTodo(this.inputRef.current.value);
        this.inputRef.current.value = '';
    }
    render(){
        return html`
            <form class='mb-3' onsubmit=${(e:Event)=>{ this.submit(e); }}>
                <input type='text' class='form-control' placeholder='Todo' ref=${this.inputRef} value='${ this.formprops.todo }'/>
            </form>
        `
    }
}

@Component({
    selector: 'todo-item'
})
class TodoItem {
    @Input()
    item:any = {};

    edit(id:number){
        this.item.editTodo(id);
    }

    delete(id:number){
        this.item.deleteTodo(id);
    }

    render(){
        return html`
            <li class="d-flex justify-content-between">
                ${this.item.id + 1}.  ${ this.item.todo }
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-primary btn-sm" onclick=${()=>{ this.edit(this.item.id) }}>Edit</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick=${()=>{ this.delete(this.item.id) }}>Delete</button>
                </div>
            </li>
        `
    }
}