import React from 'react';

import InputFile from '../components/InputFile';
import CircleAnimationButton from '../components/CircleAnimationButton-react/CircleAnimationButton';
import IconFA from '../components/CircleAnimationButton-react/IconFA';
import { faFileUpload, faFileImage, faFileCode, faBroom, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import TableWithSigns from '../components/TableWithSigns';
import { toPng } from 'html-to-image';
import Select from 'react-select';
import { charsetOptions } from '../data/consts';
import TestHeight from '../components/TestHeight';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this.testSignRef = React.createRef();

        this.state = {
            fontsList: {},
            fontName: false,
            fontSize: 11,
            signWidth: 16,
            signHeight: 16,
            signHeightError: false,
            fontWeight: 400,
            charset: charsetOptions[0],
            spaceWidth: 3
        }
    }

    componentDidMount() {
        this.refreshFontList();
    }

    addFont = async (e) => {
        let files = e.target.files;

        if (files[0]) {
            let fontName = "ERROR";

            for (let i = 0; i < files.length; i++) {
                if (files[i].name.substr(files[i].name.length - 4) === '.ttf') {
                    const data = await files[i].arrayBuffer();
                    fontName = files[i].name.replace(".ttf", "");

                    // When a font with the same name is exists delete it, before add new
                    if (this.state.fontsList[fontName]) {
                        document.fonts.delete(this.state.fontsList[fontName]);
                    }

                    let font = new FontFace(fontName, data);
                    await font.load();
                    document.fonts.add(font);
                }
            }

            this.setState({ fontName: fontName });

            this.refreshFontList();
        }

        // Clear input file value to prevent block onChange event when select same elements
        e.target.value = "";
    }

    refreshFontList = () => {
        let fonts = {};

        for (let value of document.fonts.keys()) {
            fonts[value.family] = value;
        }

        this.setState({ fontsList: fonts });
    }

    getFontListOptions = (list) => {
        let options = [];

        for (let i in list) {
            options.push({ value: i, label: i });
        }

        return options;
    }

    clearAllAddedFonts = () => {
        document.fonts.clear();
        this.refreshFontList();

        this.setState({ fontName: false });
    }

    getMinSignHeight = () => {
        return this.testSignRef.current.getHeight();
    }

    download = () => {
        if (this.ref.current === null) {
            return;
        }

        toPng(this.ref.current, { cacheBust: false, skipAutoScale: true, pixelRatio: 1, quality: 1.0 }).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'otc_font.png';
            link.href = dataUrl;
            link.click();
        }).catch((err) => {
            console.log(err);
        });
    }

    generateOtfontFile = () => {
        let text = "Font"
            + "\n  name: " + "otc_font"
            + "\n  texture: " + "otc_font"
            + "\n  height: " + this.getMinSignHeight()
            + "\n  glyph-size: " + this.state.signWidth + " " + this.state.signHeight
            + "\n  space-width: " + this.state.spaceWidth
            + "\n";

        let a = document.createElement('a');
        a.href = "data:application/octet-stream;charset=utf-8;base64," + window.btoa(unescape(encodeURIComponent(text)));
        a.textContent = 'download';
        a.download = "otc_font" + ".otfont";
        a.click();
    }

    // onChange

    onChangeFont = (e) => {
        this.setState({ fontName: e.value });
    }

    onChangeFontSize = (e) => {
        this.setState({ fontSize: Number(e.target.value) });

        // This action run before UI change, so data from getMinSignHeight is out of date, need to delay checking action
        setTimeout(() => {
            if (this.getMinSignHeight() <= this.state.signHeight) {
                this.setState({ signHeightError: false });
            } else {
                this.setState({ signHeightError: true });
            }
        }, 100);
    }

    onChangeSignWidth = (e) => {
        this.setState({ signWidth: Number(e.target.value) });
    }

    onChangeSignHeight = (e) => {
        if (this.getMinSignHeight() <= Number(e.target.value)) {
            this.setState({ signHeight: Number(e.target.value), signHeightError: false });
        } else {
            this.setState({ signHeight: Number(e.target.value), signHeightError: true });
        }
    }

    onChangeFontWeight = (e) => {
        this.setState({ fontWeight: Number(e.target.value) });
    }

    onChangeCharset = (e) => {
        this.setState({ charset: e });
    }

    onChangeSpaceWidth = (e) => {
        this.setState({ spaceWidth: Number(e.target.value) });
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <InputFile
                        text={ "Load font" }
                        accept={ ".ttf" }
                        multiple={ true }
                        icon={ faFileUpload }
                        onChange={ e => this.addFont(e) }
                        width={ 120 }
                        style={{ marginTop: 5, marginBottom: 5, marginRight: 5 }}
                    />
                    <InputFile
                        text={ "Load font from folder" }
                        multiple={ true }
                        directory={ true }
                        icon={ faFolderPlus }
                        onChange={ e => this.addFont(e) }
                        width={ 210 }
                        style={{ marginTop: 5, marginBottom: 5, marginRight: 5 }}
                    />
                    <CircleAnimationButton
                        icon={ <IconFA icon={ faBroom }/> }
                        text={ "Delete added fonts" }
                        width={ 190 }
                        color="steelPurple"
                        style={{ marginTop: 5, marginBottom: 5, marginRight: 5 }}
                        onClick={ this.clearAllAddedFonts }
                    />
                </div>

                <br/>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <div style={{ marginRight: 10 }}>Font:</div>
                    <Select
                        value={ this.state.fontName ? { value: this.state.fontName, label: this.state.fontName } : null }
                        onChange={ this.onChangeFont }
                        options={ this.getFontListOptions(this.state.fontsList) }
                        styles={{
                            container: (provided, state) => ({ ...provided, width: 300, height: 30 }),
                            option: (provided, state) => ({ ...provided, color: '#000000' }),
                            control: (provided, state) => ({ ...provided, minHeight: 20 }),
                            indicatorsContainer: (provided, state) => ({ ...provided, height: 30 })
                        }}
                    />
                </div>

                <br/>

                Font size:
                <input
                    type="number"
                    style={{ width: 100, marginTop: 10, marginLeft: 5 }}
                    value={ this.state.fontSize }
                    min={ 1 }
                    onChange={ this.onChangeFontSize }
                />

                <br/>

                Sign width:
                <input
                    type="number"
                    style={{ width: 100, marginTop: 10, marginLeft: 5 }}
                    value={ this.state.signWidth }
                    min={ 1 }
                    onChange={ this.onChangeSignWidth }
                />

                <br/>

                Sign height:
                <input
                    type="number"
                    style={{ width: 100, marginTop: 10, marginLeft: 5, backgroundColor: this.state.signHeightError ? '#FF3366' : '#FFFFFF' }}
                    value={ this.state.signHeight }
                    min={ 1 }
                    onChange={ this.onChangeSignHeight }
                />
                { this.state.signHeightError ? <div style={{ color: '#FF3366' }}>Real sign height is greater than the set height</div> : null }

                <br/>

                Font weight:
                <input
                    type="number"
                    style={{ width: 100, marginTop: 10, marginLeft: 5 }}
                    value={ this.state.fontWeight }
                    step={ 100 }
                    min={ 100 }
                    max={ 900 }
                    onChange={ this.onChangeFontWeight }
                />

                <br/>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <div style={{ marginRight: 10 }}>Charset:</div>
                    <Select
                        value={ this.state.charset }
                        onChange={ this.onChangeCharset }
                        options={ charsetOptions }
                        styles={{
                            container: (provided, state) => ({ ...provided, width: 130, height: 30 }),
                            option: (provided, state) => ({ ...provided, color: '#000000' }),
                            control: (provided, state) => ({ ...provided, minHeight: 20 }),
                            indicatorsContainer: (provided, state) => ({ ...provided, height: 30 })
                        }}
                    />
                </div>

                Space width:
                <input
                    type="number"
                    style={{ width: 100, marginTop: 10, marginLeft: 5 }}
                    value={ this.state.spaceWidth }
                    min={ 1 }
                    onChange={ this.onChangeSpaceWidth }
                />

                <br/>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 25 }}>
                    <CircleAnimationButton
                        icon={ <IconFA icon={ faFileImage }/> }
                        text={ "Download font image" }
                        width={ 200 }
                        style={{ marginTop: 5, marginBottom: 5, marginRight: 5 }}
                        onClick={ this.download }
                    />
                    <CircleAnimationButton
                        icon={ <IconFA icon={ faFileCode }/> }
                        text={ "Download otfont file" }
                        width={ 200 }
                        color="springForest"
                        style={{ marginTop: 5, marginBottom: 5, marginRight: 5 }}
                        onClick={ this.generateOtfontFile }
                    />
                </div>

                <div style={{ width: 'fit-content', margin: 'auto' }}>
                    <TableWithSigns
                        fontFamily={ this.state.fontName }
                        fontSize={ this.state.fontSize }
                        signWidth={ this.state.signWidth }
                        signHeight={ this.state.signHeight }
                        fontWeight={ this.state.fontWeight }
                        charset={ this.state.charset.value }
                        divRef={ this.ref }
                    />
                </div>

                <div style={{ marginTop: 10 }}>
                    Trying to calculate the minimum sign height
                </div>

                <TestHeight
                    fontFamily={ this.state.fontName }
                    fontSize={ this.state.fontSize }
                    signWidth={ this.state.signWidth }
                    signHeight={ this.state.signHeight }
                    fontWeight={ this.state.fontWeight }
                    style={{ margin: 'auto', width: 'fit-content' }}
                    ref={ this.testSignRef }
                />
            </div>
        );
    }
}

export default Main;
