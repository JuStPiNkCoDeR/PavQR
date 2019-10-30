class Link {
    constructor(ID, info) {
        this.id = ID;
        this.link = ID;
        this.ajax = new XMLHttpRequest();
        this.data = info;
    }

    send(callback) {
        const l = this.link;
        const aj = this.ajax;

        aj.open('POST', l, true);
        aj.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        aj.onreadystatechange = callback;
        if (this.data == null)
            aj.send();
        else
            aj.send(this.data);
    }
}