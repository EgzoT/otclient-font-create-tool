import React from 'react';

import InputFile from '../components/InputFile';
import CircleAnimationButton from '../components/CircleAnimationButton-react/CircleAnimationButton';
import IconFA from '../components/CircleAnimationButton-react/IconFA';
import { faFileUpload, faFileImage, faFileCode, faBroom, faFolderPlus, faMagic, faTools, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import TableWithSigns from '../components/TableWithSigns';
import { toPng } from 'html-to-image';
import Select from 'react-select';
import { charsetOptions } from '../data/consts';
import TestHeight from '../components/TestHeight';
import FlexContainer from '../components/FlexContainer';

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
            spaceWidth: 3,
            fontImageName: "new_font",
            fontImageNameChanged: false,
            otfontFileName: "new_font",
            otfontFileNameChanged: false,
            fontColor: "#FFFFFF",
            antialiasing: true,
            textStroke: false,
            textStrokeSize: 0.2,
            textStrokeColor: "#000000",
            strokeFill: false,

            additionalOptions: false
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

            this.createFontName();

            this.refreshFontList();
        }

        // Clear input file value to prevent block onChange event when select same elements
        e.target.value = "";
    }

    refreshFontList = () => {
        let fonts = {};

        if (document.fonts.size > 0) {
            document.fonts.forEach(function(value) {
                fonts[value.family] = value;
            });
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

        this.createFontName();
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
            link.download = this.state.fontImageName + ".png";
            link.href = dataUrl;
            link.click();
        }).catch((err) => {
            console.log(err);
        });
    }

    generateOtfontFile = () => {
        let text = "Font"
            + "\n  name: " + this.state.otfontFileName
            + "\n  texture: " + this.state.fontImageName
            + "\n  height: " + this.getMinSignHeight()
            + "\n  glyph-size: " + this.state.signWidth + " " + this.state.signHeight
            + "\n  space-width: " + this.state.spaceWidth
            + "\n";

        let a = document.createElement('a');
        a.href = "data:application/octet-stream;charset=utf-8;base64," + window.btoa(unescape(encodeURIComponent(text)));
        a.textContent = 'download';
        a.download = this.state.otfontFileName + ".otfont";
        a.click();
    }

    createFontName = () => {
        // Delay action to wait for other setState changes, to get current data
        setTimeout(() => {
            let fontName = this.state.fontName ? this.state.fontName : "new_font";
            let fontFileName = fontName + "-" + this.state.fontSize + "px" + "_" + this.state.charset.label;

            if (this.state.fontImageNameChanged === true && this.state.otfontFileNameChanged === true) {
                return;
            } else if (this.state.fontImageNameChanged === false && this.state.otfontFileNameChanged === false) {
                this.setState({ fontImageName: fontFileName, otfontFileName: fontFileName });
            } else if (this.state.fontImageNameChanged === true && this.state.otfontFileNameChanged === false) {
                this.setState({ otfontFileName: fontFileName });
            } else if (this.state.fontImageNameChanged === false && this.state.otfontFileNameChanged === true) {
                this.setState({ fontImageName: fontFileName });
            }
        }, 100);
    }

    resetFontImageNameChanged = () => {
        this.setState({ fontImageNameChanged: false });

        this.createFontName();
    }

    resetOtfontFileNameChanged = () => {
        this.setState({ otfontFileNameChanged: false });

        this.createFontName();
    }

    openAdditionalOptions = () => {
        this.setState({ additionalOptions: true });
    }

    closeAdditionalOptions = () => {
        this.setState({ additionalOptions: false });
    }

    // onChange

    onChangeFont = (e) => {
        this.setState({ fontName: e.value });

        this.createFontName();
    }

    onChangeFontSize = (e) => {
        this.setState({ fontSize: Number(e.target.value) });

        this.createFontName();

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

        this.createFontName();
    }

    onChangeSpaceWidth = (e) => {
        this.setState({ spaceWidth: Number(e.target.value) });
    }

    onChangeFontImageName = (e) => {
        this.setState({ fontImageName: e.target.value, fontImageNameChanged: true });
    }

    onChangeOtfontFileName = (e) => {
        this.setState({ otfontFileName: e.target.value, otfontFileNameChanged: true });
    }

    onChangeFontColor = (e) => {
        this.setState({ fontColor: e.target.value });
    }

    onChangeAntialiasing = (e) => {
        this.setState({ antialiasing: e.target.checked });
    }

    onChangeTextStroke = (e) => {
        this.setState({ textStroke: e.target.checked });
    }

    onChangeTextStrokeSize = (e) => {
        this.setState({ textStrokeSize: Number(e.target.value) });
    }

    onChangeTextStrokeColor = (e) => {
        this.setState({ textStrokeColor: e.target.value });
    }

    onChangeStrokeFill = (e) => {
        this.setState({ strokeFill: e.target.checked });
    }

    render() {
        return (
            <div>
                <FlexContainer style={{ marginTop: 5 }}>
                    <InputFile
                        text={ "Load font" }
                        accept={ ".ttf" }
                        multiple={ true }
                        icon={ faFileUpload }
                        onChange={ e => this.addFont(e) }
                        width={ 120 }
                    />
                    <InputFile
                        text={ "Load font from folder" }
                        multiple={ true }
                        directory={ true }
                        icon={ faFolderPlus }
                        onChange={ e => this.addFont(e) }
                        width={ 210 }
                    />
                    <CircleAnimationButton
                        icon={ <IconFA icon={ faBroom }/> }
                        text={ "Delete added fonts" }
                        width={ 190 }
                        color="steelPurple"
                        onClick={ this.clearAllAddedFonts }
                    />
                </FlexContainer>

                <FlexContainer>
                    <div>Font:</div>
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
                </FlexContainer>

                <FlexContainer>
                    <div>
                        Font size:
                    </div>
                    <input
                        type="number"
                        style={{ width: 100 }}
                        value={ this.state.fontSize }
                        min={ 1 }
                        onChange={ this.onChangeFontSize }
                    />
                </FlexContainer>

                <FlexContainer>
                    <div>
                        Sign width:
                    </div>
                    <input
                        type="number"
                        style={{ width: 100 }}
                        value={ this.state.signWidth }
                        min={ 1 }
                        onChange={ this.onChangeSignWidth }
                    />
                </FlexContainer>

                <FlexContainer>
                    <div>
                        Sign height:
                    </div>
                    <input
                        type="number"
                        style={{
                            width: 100,
                            backgroundColor: this.state.signHeightError ? '#FF3366' : '#FFFFFF'
                        }}
                        value={ this.state.signHeight }
                        min={ 1 }
                        onChange={ this.onChangeSignHeight }
                    />
                </FlexContainer>
                { this.state.signHeightError ? <div style={{ color: '#FF3366', marginTop: 5 }}>Real sign height is greater than the set height</div> : null }

                <FlexContainer>
                    <div>
                        Font weight:
                    </div>
                    <input
                        type="number"
                        style={{ width: 100 }}
                        value={ this.state.fontWeight }
                        step={ 100 }
                        min={ 100 }
                        max={ 900 }
                        onChange={ this.onChangeFontWeight }
                    />
                </FlexContainer>

                <FlexContainer>
                    <div>
                        Charset:
                    </div>
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
                </FlexContainer>

                <FlexContainer>
                    <div>
                        Space width:
                    </div>
                    <input
                        type="number"
                        style={{ width: 100 }}
                        value={ this.state.spaceWidth }
                        min={ 1 }
                        onChange={ this.onChangeSpaceWidth }
                    />
                </FlexContainer>

                <FlexContainer>
                    <div>
                        Font image name:
                    </div>
                    <input
                        type="text"
                        style={{
                            width: 300,
                            border: this.state.fontImageNameChanged ? "3px solid #0099CC" : null
                        }}
                        value={ this.state.fontImageName }
                        onChange={ this.onChangeFontImageName }
                    />
                    <div>
                        <CircleAnimationButton
                            icon={ <IconFA icon={ faMagic }/> }
                            height={ 30 }
                            color={ "deepSea" }
                            text={ "Set automatically" }
                            width={ 170 }
                            onClick={ this.resetFontImageNameChanged }
                        />
                    </div>
                </FlexContainer>

                <FlexContainer>
                    <div>
                        Otfont file name:
                    </div>
                    <input
                        type="text"
                        style={{
                            width: 300,
                            border: this.state.otfontFileNameChanged ? "3px solid #0099CC" : null
                        }}
                        value={ this.state.otfontFileName }
                        onChange={ this.onChangeOtfontFileName }
                    />
                    <div>
                        <CircleAnimationButton
                            icon={ <IconFA icon={ faMagic }/> }
                            height={ 30 }
                            color={ "deepSea" }
                            text={ "Set automatically" }
                            width={ 170 }
                            onClick={ this.resetOtfontFileNameChanged }
                        />
                    </div>
                </FlexContainer>

                <br/>

                <CircleAnimationButton
                    icon={ <IconFA icon={ this.state.additionalOptions === false ? faTools : faTimesCircle }/> }
                    alwaysVisibleText={ true }
                    text={ this.state.additionalOptions === false ? "Open options" : "Close options" }
                    width={ 150 }
                    color={ this.state.additionalOptions === false ? "coralBlue" : "gray" }
                    style={{ margin: "auto" }}
                    onClick={ this.state.additionalOptions === false ? this.openAdditionalOptions : this.closeAdditionalOptions }
                />

                { this.state.additionalOptions === true ?
                    <div>
                        <FlexContainer>
                            <div>
                                Font color:
                            </div>
                            <input
                                type="color"
                                style={{ width: 100 }}
                                value={ this.state.fontColor }
                                onChange={ this.onChangeFontColor }
                            />
                        </FlexContainer>
                        <FlexContainer>
                            <div>
                                Antialiasing:
                            </div>
                            <input
                                type="checkbox"
                                defaultChecked={ this.state.antialiasing }
                                onChange={ this.onChangeAntialiasing }
                            />
                        </FlexContainer>
                        <div style={{ fontSize: 14 }}>
                            Experimental option, probably works only on Mac OS X/macOS, more info <a style={{ color: "#CC0033" }} href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth">link</a>.
                        </div>

                        <FlexContainer>
                            <div>
                                Text stroke:
                            </div>
                            <input
                                type="checkbox"
                                defaultChecked={ this.state.textStroke }
                                onChange={ this.onChangeTextStroke }
                            />
                        </FlexContainer>

                        <FlexContainer>
                            <div>
                                Text stroke size:
                            </div>
                            <input
                                type="number"
                                style={{ width: 100 }}
                                value={ this.state.textStrokeSize }
                                min={ 0 }
                                step={ 0.1 }
                                onChange={ this.onChangeTextStrokeSize }
                            />
                        </FlexContainer>

                        <FlexContainer>
                            <div>
                                Text stroke color:
                            </div>
                            <input
                                type="color"
                                style={{ width: 100 }}
                                value={ this.state.textStrokeColor }
                                onChange={ this.onChangeTextStrokeColor }
                            />
                        </FlexContainer>

                        <FlexContainer>
                            <div>
                                Stroke fill:
                            </div>
                            <input
                                type="checkbox"
                                defaultChecked={ this.state.strokeFill }
                                onChange={ this.onChangeStrokeFill }
                            />
                        </FlexContainer>
                    </div>
                    :
                    null
                }

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

                <br/>

                <div style={{ width: 'fit-content', margin: 'auto' }}>
                    <TableWithSigns
                        fontFamily={ this.state.fontName }
                        fontSize={ this.state.fontSize }
                        signWidth={ this.state.signWidth }
                        signHeight={ this.state.signHeight }
                        fontWeight={ this.state.fontWeight }
                        charset={ this.state.charset.value }
                        fontColor={ this.state.fontColor }
                        antialiasing={ this.state.antialiasing }
                        textStroke={ this.state.textStroke }
                        textStrokeSize={ this.state.textStrokeSize }
                        textStrokeColor={ this.state.textStrokeColor }
                        strokeFill={ this.state.strokeFill }
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
                    fontColor={ this.state.fontColor }
                    antialiasing={ this.state.antialiasing }
                    textStroke={ this.state.textStroke }
                    textStrokeSize={ this.state.textStrokeSize }
                    textStrokeColor={ this.state.textStrokeColor }
                    strokeFill={ this.state.strokeFill }
                    style={{ margin: 'auto', width: 'fit-content' }}
                    ref={ this.testSignRef }
                />
            </div>
        );
    }
}

export default Main;
