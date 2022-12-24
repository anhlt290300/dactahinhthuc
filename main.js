function normalize(line) {
    var _line = line.replace(/\s+/g, '');
    return _line
}

const nameClass = document.getElementById('input-nameclass')
const btn = document.getElementById('btn')
const output_text = document.getElementById('output-text')
const input_text = document.getElementById('input-text')
const input_file = document.getElementById('input-file')

var isArr = false

var name_class = ''

var name_method = ''
var name_method_nhap = ''
var name_method_xuat = ''
var name_method_kiemtra = ''
var name_method_xuli = ''
var pre = ''
var post = ''

var varible_ = []

var result_ = []

var name_ = ''


function clear_() {
    isArr = false
    name_class = ''

    name_method = ''
    name_method_nhap = ''
    name_method_xuat = ''
    name_method_kiemtra = ''
    name_method_xuli = ''
    pre = ''
    post = ''

    varible_ = []

    result_ = []

    name_ = ''
}


btn.onclick = function () {

}


//// Doc file input
input_file.onchange = function () {
    let fr = new FileReader()
    fr.readAsText(input_file.files[0])


    ///// trong luc input dang load du lieu len
    fr.onload = function () {
        //// xoa bo nho
        clear_()


        input_text.innerText = fr.result
        name_method = normalize(input_text.innerText.slice(0, input_text.innerText.indexOf('pre')))
        pre = normalize(input_text.innerText.slice(input_text.innerText.indexOf('pre') + 3, input_text.innerText.indexOf('post')))
        post = normalize(input_text.innerText.slice(input_text.innerText.indexOf('post') + 4))
        name_class = (nameClass.value === '') ? 'Program' : nameClass.value


        count_variable(name_method);


        let key = 'c++'

        output_text.innerHTML = build_slution(key)
        //  + Main_('c++')

    }

}


function count_variable(line) {
    console.log(line)


    let string_ = line.slice(line.indexOf("(") + 1, line.indexOf(")"))

    let arr_varible = string_.split(",")

    for (i = 0; i < arr_varible.length; i++) {
        let arr = arr_varible[i].split(':')

        varible_[i] = { name_varible: arr[0], properties: converse_properties(arr[1]) }
    }

    name_ = line.slice(0, line.indexOf('('))

    string_ = line.slice(line.indexOf(")") + 1)

    let arr_result = string_.split(':')
    result_[0] = { name_result: arr_result[0], properties: converse_properties(arr_result[1]) }

}


function Nhap_(key) {

    let string_method = ''

    let string_ = ''

    for (i = 0; i < varible_.length; i++) {
        if (i > 0) {
            string_ += ", "
            string_method += ", "
        }
        //// check nhap theo mang hay bth
        if (isArr) {
            if (i > 0) {
                string_ += `<red>${varible_[i].properties}</red> <yellow>&</yellow>${varible_[i].name_varible}`
                string_method += varible_[i].name_varible
            } else {
                string_ += `<red>${varible_[i].properties}</red> ${varible_[i].name_varible}`
                string_method += varible_[i].name_varible
            }
        } else {
            string_ += `<red>${varible_[i].properties}</red> <yellow>&</yellow>${varible_[i].name_varible}`
            string_method += varible_[i].name_varible
        }


    }

    let string_content = ''

    if (isArr) {
        string_content += `<p><tab></tab><tab></tab>cout <yellow><<</yellow> <green>"Nhap n: "</green>;</p>
                           <p><tab></tab><tab></tab>cin <yellow>>></yellow> n;</p>`;
        string_content += `<p><tab></tab><tab></tab>for(<red>int</red> i = 0; i < n; i++){</p><p><tab></tab><tab></tab>cout<yellow><<</yellow><green>"Nhap phan tu thu "</green><< i+1 << <green>": "</green>;</p><p><tab></tab><tab></tab>cin<yellow>>></yellow>${varible_[0].name_varible}[i];<br><tab></tab><tab></tab>}</p>
        `
    } else {
        for (i = 0; i < varible_.length; i++) {

            string_content += `<p><tab></tab><tab></tab>cout <yellow><<</yellow> <green>"nhap ${varible_[i].name_varible}"</green> ;</p>`
            string_content += `<p><tab></tab><tab></tab>cin <yellow>>></yellow> ${varible_[i].name_varible};</p>`

            if (i < varible_.length - 1) {
                string_content += ""
            }
        }

    }

    if (key === 'c++') {

        name_method_nhap += `Nhap_${name_}(${string_method})`

        return `
            <p><tab></tab>public: <red>void</red> Nhap_${name_}(${string_}) {<br/>${string_content} <tab></tab>}</p>
        `
    }
    else if (key === 'python') {

    }


}

function Xuat_(key) {
    let string_method = ''

    string_method = result_[0].name_result

    let string_ = ''

    string_ += `<red>${result_[0].properties}</red> ${result_[0].name_result}`


    let string_content = '<tab></tab><tab></tab>cout <yellow><<</yellow> <green>"Ket qua la "</green> <yellow><<</yellow> '




    if (key === 'c++') {
        name_method_xuat += `Xuat_${name_}(${string_method})`
        return `
            <p><tab></tab>public: <red>void</red> Xuat_${name_}(${string_}) {<br/><p>${string_content} ${result_[0].name_result} ;<br/></p><tab></tab>}</p>
        `
    }
    else if (key === 'python') {

    }


}

function Kiemtra_(key) {

    let string_method = ''

    let string_ = ''

    let arr = []

    for (i = 0; i < varible_.length; i++) {

        if (i > 0) {
            string_ += ", "
            string_method += ', '
        }

        if (isArr) {
            if (i > 0) {
                string_ += `<red>${varible_[i].properties}</red> ${varible_[i].name_varible}`
                string_method += varible_[i].name_varible
            } else {
                string_ += `<red>${varible_[i].properties}</red> ${varible_[i].name_varible}`
                string_method += varible_[i].name_varible
            }

        } else {
            string_ += `<red>${varible_[i].properties}</red> ${varible_[i].name_varible}`
            string_method += varible_[i].name_varible
        }
    }

    var string_content = ''

    if (pre === '') {
        string_content += '<br/><p><tab></tab><tab></tab><yellow>return</yellow> 1;</p>'
    } else {

        arr = pre.split('||')


        for (i = 0; i < arr.length; i++) {
            let flag = arr[i]

            arr[i] = flag.slice(flag.indexOf('(') + 1, flag.lastIndexOf(')'))
        }

        for (i = 0; i < arr.length; i++) {

            string_content += `<br/><p><tab></tab><tab></tab>if(${arr[i]}){<br/><tab></tab><tab></tab><tab></tab><yellow>return</yellow> 1;<br><tab></tab><tab></tab>}</p>`


        }

        string_content += `<p><tab></tab><tab></tab>else{<br/><tab></tab><tab></tab><tab></tab><yellow>return</yellow> 0;<br><tab></tab><tab></tab>}</p>`
    }




    if (key === 'c++') {
        name_method_kiemtra += `Kiemtra_${name_}(${string_method})`
        return `
            <p><tab></tab>public: <red>int</red> Kiemtra_${name_}(${string_}) {${string_content} <tab></tab>}</p>
        `
    }
    else if (key === 'python') {

    }


}


function Xuli_(key) {

    let string_method = ''

    let string_ = ''

    //// mang phan tu bieu thuc trong post
    let arr = []

    //// xu li ten ham

    for (i = 0; i < varible_.length; i++) {

        if (i > 0) {
            string_ += ", "
            string_method += ', '
        }

        if (isArr) {
            if (i > 0) {
                string_ += `<red>${varible_[i].properties}</red> ${varible_[i].name_varible}`
                string_method += varible_[i].name_varible
            } else {
                string_ += `<red>${varible_[i].properties}</red> ${varible_[i].name_varible}`
                string_method += varible_[i].name_varible
            }

        } else {
            string_ += `<red>${varible_[i].properties}</red> ${varible_[i].name_varible}`
            string_method += varible_[i].name_varible
        }
    }

    //// xu li phan ctr ben trong ham
    var string_content = ''


    //// xu li phan so sanh
    if (true) {
        //// tach post ra thanh mang
        if (post === '') {
            string_content += ''
        } 
        else if (['VM', 'TT'].some( ai => post.includes(ai) )) {
            const newPost = post.substring(0, post.length - 1).replaceAll('..', 'to').replace('kq=(', '');
            let finalResultName = 'result';
            const stringConditions = newPost.split('.');
            // string_content += `<p><tab></tab><tab></tab><red>bool</red> result = false;</p>`;
            // string_content += `<p><tab></tab><tab></tab>for(<red>int</red> i = 0; i < ${varible_[1].name_varible} - 1; i++) {</p>`;
            let closeBrackets = 1;
            stringConditions.forEach((condition, index) => {
                const conditions = (condition.slice(condition.indexOf('{') + 1, condition.lastIndexOf('}'))).split('to');
                if(index > 0 && index < stringConditions.length - 1) {
                    // string_content += `<p><tab></tab><tab></tab><tab></tab><tab></tab><red>int</red> ${condition[2]} = ${conditions[0]};<br><tab></tab><tab></tab><tab></tab>}</p>`;
                }
                if(condition.includes('VM')){
                    string_content += `<p><tab></tab><tab></tab><red>bool</red> ${finalResultName} = true;</p>`;
                    string_content += `<p><tab></tab><tab></tab>for(<red>int</red> i = 0; i < ${varible_[1].name_varible} - 1; i++) {</p>`;
                } else if(stringConditions[0].includes('VM') && condition.includes('TT')) {
                    
                    string_content += `<p><tab></tab><tab></tab><red>bool</red> resultTT = false;</p>`;
                    finalResultName = 'resultTT';
                    const iPushOne = condition[6] + condition[7] + condition[8];
                    string_content += `
                    <p><tab></tab><tab></tab><tab></tab>for(<red>int</red> ${condition[2]} = ${iPushOne}; ${condition[2]} <  ${varible_[1].name_varible}; ${condition[2]}++) {`;
                    closeBrackets++;
                } else if(condition.includes('TT')){
                    if(index) {
                        // string_content += `<p><tab></tab><tab></tab><red>bool</red> result_${index} = false;</p>`;
                        string_content += `<p><tab/><tab></tab><tab></tab>for(<red>int</red> j = i + 1; j < ${varible_[1].name_varible}; j++) {</p>`;
                        closeBrackets++;
                    }
                    else {
                        string_content += `<p><tab></tab><tab></tab><red>bool</red> ${finalResultName} = false;</p>`;
                        string_content += `<p><tab></tab><tab></tab>for(<red>int</red> i = 0; i < ${varible_[1].name_varible} - 1; i++) {</p>`;
                    }
                }
                else {
                    string_content += `<p><tab></tab><tab></tab><tab></tab>if( ${condition.replaceAll('(', '[').replaceAll(')', ']')} ) {
                        ${stringConditions[1].includes('TT') ? `<br><tab></tab><tab></tab><tab></tab><tab></tab>${finalResultName} = true;` : ''}
                        <br><tab></tab><tab></tab><tab></tab>}</p>
                    `;
                    finalResultName = 'result';
                    if(stringConditions[0].includes('VM') && stringConditions.length < 3) {
                        string_content += `
                        <p><tab></tab><tab></tab><tab></tab>else {
                            <br><tab/><tab></tab><tab></tab><tab></tab>${finalResultName} = false;
                            <br><tab></tab><tab></tab>}</p>
                        `;
                        if(stringConditions[1].includes('TT')) {
                            string_content += `
                            if(resultTT == false) {
                                result = false;
                            }
                        }
                            `;
                        }
                    }
                    else if(stringConditions[0].includes('VM') && stringConditions[1].includes('TT')) {
                        //test 8
                        closeBrackets--;
                        string_content += `
                            <p><tab/><tab></tab><tab></tab>}</p>
                            <p><tab/><tab></tab><tab></tab>if(resultTT == false) {</p>
                                <p><tab/><tab/><tab></tab><tab></tab>result = false;</p>
                            <p><tab/><tab></tab><tab></tab>}</p>
                        `;
                    }
                }
            });
            const closeBracket = `<p><tab></tab><tab></tab>}</p>`;
            string_content += `${closeBracket.repeat(closeBrackets)}<p><tab></tab><tab></tab>return ${finalResultName};</p>`;
        }
        else {

            arr = post.split('||')

            for (i = 0; i < arr.length; i++) {
                let flag = arr[i]

                arr[i] = flag.slice(flag.indexOf('(') + 1, flag.lastIndexOf(')'))
            }
            //// khai bao bien kq
            let value = (result_[0].properties === 'float') ? '0' : ((result_[0].properties === 'bool') ? 'false' : '""')
            string_content += `<p><tab></tab><tab></tab><red>${result_[0].properties}</red> ${result_[0].name_result} = ${value};</p>`

            //// tach phan tu trong mang va xu li
            for (i = 0; i < arr.length; i++) {
                let flag = [];

                let flag_ = [];

                if (check__condition(arr[i])) {
                    flag[0] = arr[i].slice(0, arr[i].indexOf("&"))
                    flag[1] = arr[i].slice(arr[i].indexOf("&") + 2)
                } else {
                    flag[0] = arr[i]
                }


                if (flag[0][0] == "(")
                    flag[0] = flag[0].slice(flag[0].indexOf('(') + 1, flag[0].lastIndexOf(')'))

                //// chuan hoa cac toan tu trong if
                //// kiem tra xem co ton tai dieu kien trong if k
                if (flag[1] != undefined) {
                    flag_[1] = check_operator(flag[1])
                }

                ////chuan hoa du lieu trong kq
                flag_[0] = check_value(flag[0])


                if (flag[1] != undefined) {
                    string_content += `<p><tab></tab><tab></tab><yellow>if</yellow>( ${flag_[1]} ){<br><tab></tab><tab></tab><tab></tab>${flag_[0]} ;<br><tab></tab><tab></tab>}</p>`
                } else {
                    string_content += `<p><tab></tab><tab></tab>${flag_[0]} ;</p>`
                }
            }

            ///// return kq

            string_content += `<p><tab></tab><tab></tab><yellow>return</yellow> ${result_[0].name_result};</p>`
        }
    }


    if (key === 'c++') {
        name_method_xuli += `${name_}(${string_method})`
        return `
            <p><tab></tab>public: <red>${result_[0].properties}</red> ${name_}(${string_}) {${string_content} <tab></tab>}</p>
        `
    }
    else if (key === 'python') {

    }


}

function Main_(key) {
    let string_ = ''

    //// khoi tao cac bien
    for (i = 0; i < varible_.length; i++) {

        let value = (varible_[i].properties === "int" || varible_[i].properties === "float") ? '0' : (varible_[i].properties === "bool") ? 'true' : '';
        
        string_ += `<p><tab><red>${varible_[i].properties}</red> ${varible_[i].name_varible} ${varible_[i].properties.includes('*') ? '' : ' = ' + value} ;</p> `
    }
    let value = (result_[0].properties === "int" || result_[0].properties === "float") ? '0' : (result_[0].properties === "bool") ? 'true' : '""'
    string_ += `<p><tab><red>${result_[0].properties}</red> ${result_[0].name_result} = ${value} ;</p> `

    //// khoi tao ctr
    string_ += `<p><tab><red>${name_class}</red> ctr;</p>`


    //// nhap 

    string_ += `<p><tab>ctr.${name_method_nhap};</p>`

    //// kiem tra va xuat

    string_ += `<p><tab><yellow>if</yellow>( ctr.${name_method_kiemtra} == 1 ){<br><tab></tab>${result_[0].name_result} = ctr.${name_method_xuli};<br><tab></tab>ctr.${name_method_xuat};<br>}<yellow>else</yellow>{<br><tab></tab>cout <yellow><<</yellow> <green>"thong tin nhap khong hop le"</green>;</p>`


    if (key === 'c++') {
        return `            
            <p><red>int</red> main(){ ${string_}  <tab></tab>}</p>
        `
    }
    else if (key === 'python') {

    }
}


function converse_properties(properties) {
    if (properties === 'R') {
        properties = 'float'
    }
    else if (properties === "N" || properties === "Z") {
        properties = 'int'
    }
    else if (properties === "B") {
        properties = 'bool'
    } else if (properties === "char*") {
        properties = 'string'
    } else if (properties === "N*" || properties === "Z*") {
        properties = 'int *'
        isArr = true
    }
    else if (properties === "R*") {
        properties = 'float *'
        isArr = true
    }

    return properties
}


function build_slution(key) {
    key = (key === undefined) ? 'c++' : key
    let content_ = ''
    if (key === "c++") {

        /// kiem tra co kieu du lieu string k
        let flag = false
        let include_string = ''
        if (true) {
            for (i = 0; i < varible_.length; i++) {
                if (varible_[i].properties === 'char' || varible_[i].properties === 'char*')
                    flag = true
            }
            if (flag) {
                include_string += '<p><gray>#include</gray> <span><</span><blue>string.h</blue><span>></span>;</p>'
            }
        }

        //// THem thu vien
        content_ += `<p><yellow>#include</yellow> <span><</span><blue>iostream</blue><span>></span>;</p>` + ((flag) ? `${include_string}` : '') + `<p><yellow>using namespace</yellow> std;</p>`

        //// tao class
        let class_ = `class ${name_class}{<br>` + Nhap_(key) + Xuat_(key) + Kiemtra_(key) + Xuli_(key) + `};`

        content_ += class_

        //// tao ham main

        content_ += Main_(key) + `<p><tab></tab><yellow>return</yellow> 0;<br>}</p>`

    }
    else if (key === 'python') {

    }

    return content_
}

function check_operator(line) {

    let arr = []

    let string_ = ''

    for (j = 0; j < line.length; j++) {
        if (line[j] == '=') {
            if (j - 1 > 0 && line[j - 1] == '"')
                continue
            if (line[j - 1] == '!')
                continue
            if (line[j - 1] == '>')
                continue
            if (line[j - 1] == '<')
                continue
            arr.push(j)

        }
    }
    //console.log(arr)
    if (arr.length > 0) {
        //string_ = replace__operator_(line, '==', arr)
        //console.log("vao ")
        //console.log(arr + " " + arr.length)
        string_ = replace__operator_(line, arr)
        return string_
    }
    else return line

}

function check_value(line) {

    //// Check TRUE => true
    for (j = 0; j < line.length - 3; j++) {
        if (line[j] == 'T') {
            if (j - 1 > 0 && line[j - 1] == '"' && line[j - 1] == `'`)
                continue
            if (line[j + 1] != 'R')
                continue
            if (line[j + 2] != 'U')
                continue
            if (line[j + 3] != 'E')
                continue

            line = replace_string_lowercase(line, 'true', j)
        }
    }

    //// check FALSE => false
    for (j = 0; j < line.length - 4; j++) {
        if (line[j] == 'F') {
            if (j - 1 > 0 && line[j - 1] == '"')
                continue
            if (line[j + 1] != 'A')
                continue
            if (line[j + 2] != 'L')
                continue
            if (line[j + 3] != 'S')
                continue
            if (line[j + 4] != 'E')
                continue

            line = replace_string_lowercase(line, 'false', j)
        }
    }
    return line
}


function replace_string_uppercase(line, key, start) {
    let string_ = line.slice(0, start) + line.slice(start, start + key.length).toUpperCase() + line.slice(start + key.length)
    return string_
}

function replace_string_lowercase(line, key, start) {
    let string_ = line.slice(0, start) + line.slice(start, start + key.length).toLowerCase() + line.slice(start + key.length)
    return string_
}

function replace__operator_(line, arr) {

    let string_ = ''
    let flag = 0


    for (j = 0; j < line.length; j++) {

        if (j != arr[flag]) {
            string_ += line[j]
        } else {
            string_ += '=='
            flag++
        }
    }
    //console.log('ham dc goi ' + string_)

    return string_

}

function check__condition(line) {
    if (line.indexOf("&&") >= 0) {
        return true
    } else {
        return false
    }
}