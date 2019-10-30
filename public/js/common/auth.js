function submit(url, form) {
    const data = new FormData(form);
    const link = new Link(url, data);
    console.log(data);
    link.send(function () {
        if (this.readyState !== 4) return;
        const ans = JSON.parse(this.responseText);
        console.log(ans);
        if (ans.answer.error || ans.answer.warning) {
            $('body').append(ans.answer.html);
        } else if (ans.answer.html !== null || undefined)
            document.write(ans.answer.html);
    });
}
