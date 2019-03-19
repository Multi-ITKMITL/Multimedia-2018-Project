function chkString() {
    if (document.frmMain.txtString.value.length < 5 || document.frmMain.txtString.value.length > 15) {
        alert('Please input name (5-15 Character) .');
        return false;
    }
}