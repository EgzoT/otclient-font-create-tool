import { useState, createRef, useEffect } from 'react';

import InputFile from '../components/InputFile';
import CircleAnimationButton from '../components/CircleAnimationButton-react/CircleAnimationButton';
import IconFA from '../components/CircleAnimationButton-react/IconFA';
import { faFileUpload, faFileImage, faFileCode, faBroom, faFolderPlus, faMagic, faTools, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import TableWithSigns from '../components/TableWithSigns';
import { toPng } from 'html-to-image';
import Select, { SingleValue } from 'react-select';
import { charsetOptions } from '../data/consts';
import TestHeight from '../components/TestHeight';
import FlexContainer from '../components/FlexContainer';

const Main = () => {
    const ref = createRef<HTMLDivElement>();
    const testSignRef = createRef<TestHeight>();

    const [fontsList, setFontsList] = useState<{ [key: string]: FontFace }>({});
    const [fontName, setFontName] = useState<string>('');
    const [fontSize, setFontSize] = useState<number>(11);
    const [signWidth, setSignWidth] = useState<number>(16);
    const [signHeight, setSignHeight] = useState<number>(16);
    const [signHeightError, setSignHeightError] = useState<boolean>(false);
    const [fontWeight, setFontWeight] = useState<number>(400);
    const [charset, setCharset] = useState<{ value: number[][], label: string }>(charsetOptions[0]);
    const [spaceWidth, setSpaceWidth] = useState<number>(3);
    const [fontImageName, setFontImageName] = useState<string>('new_font');
    const [fontImageNameChanged, setFontImageNameChanged] = useState<boolean>(false);
    const [otfontFileName, setOtfontFileName] = useState<string>('new_font');
    const [otfontFileNameChanged, setOtfontFileNameChanged] = useState<boolean>(false);
    const [fontColor, setFontColor] = useState<string>('#FFFFFF');
    const [antialiasing, setAntialiasing] = useState<boolean>(true);
    const [textStroke, setTextStroke] = useState<boolean>(false);
    const [textStrokeSize, setTextStrokeSize] = useState<number>(0.2);
    const [textStrokeColor, setTextStrokeColor] = useState<string>('#000000');
    const [strokeFill, setStrokeFill] = useState<boolean>(false);
    const [additionalOptions, setAdditionalOptions] = useState<boolean>(false);

    useEffect(() => {
        refreshFontList();
    }, []);

    const addFont = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        let files = e.target.files;

        if (files !== null && files[0]) {
            let fontName = "ERROR";

            for (let i = 0; i < files.length; i++) {
                if (files[i].name.substr(files[i].name.length - 4) === '.ttf') {
                    const data = await files[i].arrayBuffer();
                    fontName = files[i].name.replace(".ttf", "");

                    // When a font with the same name is exists delete it, before add new
                    if (fontsList[fontName]) {
                        document.fonts.delete(fontsList[fontName]);
                    }

                    let font = new FontFace(fontName, data);
                    await font.load();
                    document.fonts.add(font);
                }
            }

            setFontName(fontName);

            createFontName();

            refreshFontList();
        }

        // Clear input file value to prevent block onChange event when select same elements
        e.target.value = "";
    }

    const refreshFontList = (): void => {
        let fonts: { [key: string]: FontFace } = {};

        if (document.fonts && document.fonts.size > 0) {
            document.fonts.forEach(function(value) {
                fonts[value.family] = value;
            });
        }

        setFontsList(fonts);
    }

    const getFontListOptions = (list: { [key: string]: FontFace }): { value: string, label: string }[] => {
        let options: { value: string, label: string }[] = [];

        for (let i in list) {
            options.push({ value: i, label: i });
        }

        return options;
    }

    const clearAllAddedFonts = (): void => {
        document.fonts.clear();
        refreshFontList();

        setFontName('');

        createFontName();
    }

    const getMinSignHeight = (): number => {
        return testSignRef.current ? testSignRef.current.getHeight() : 0;
    }

    const download = (): void => {
        if (ref.current === null) {
            return;
        }

        toPng(ref.current, { cacheBust: false, skipAutoScale: true, pixelRatio: 1, quality: 1.0 }).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = fontImageName + ".png";
            link.href = dataUrl;
            link.click();
        }).catch((err) => {
            console.log(err);
        });
    }

    const generateOtfontFile = (): void => {
        let text = "Font"
            + "\n  name: " + otfontFileName
            + "\n  texture: " + fontImageName
            + "\n  height: " + getMinSignHeight()
            + "\n  glyph-size: " + signWidth + " " + signHeight
            + "\n  space-width: " + spaceWidth
            + "\n";

        let a = document.createElement('a');
        a.href = "data:application/octet-stream;charset=utf-8;base64," + window.btoa(unescape(encodeURIComponent(text)));
        a.textContent = 'download';
        a.download = otfontFileName + ".otfont";
        a.click();
    }

    const createFontName = (): void => {
        // Delay action to wait for other setState changes, to get current data
        setTimeout(() => {
            let fontNameValue = fontName ? fontName : "new_font";
            let fontFileName = fontNameValue + "-" + fontSize + "px_" + charset.label;

            if (fontImageNameChanged === true && otfontFileNameChanged === true) {
                return;
            } else if (fontImageNameChanged === false && otfontFileNameChanged === false) {
                setFontImageName(fontFileName);
                setOtfontFileName(fontFileName);
            } else if (fontImageNameChanged === true && otfontFileNameChanged === false) {
                setOtfontFileName(fontFileName);
            } else if (fontImageNameChanged === false && otfontFileNameChanged === true) {
                setFontImageName(fontFileName);
            }
        }, 100);
    }

    const resetFontImageNameChanged = (): void => {
        setFontImageNameChanged(false);

        createFontName();
    }

    const resetOtfontFileNameChanged = (): void => {
        setOtfontFileNameChanged(false);

        createFontName();
    }

    // onChange

    const onChangeFont = (e: SingleValue<{ value: string; label: string; }>): void => {
        if (e !== null) {
            setFontName(e.value);

            createFontName();
        }
    }

    const onChangeFontSize = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFontSize(Number(e.target.value));

        createFontName();

        // This action run before UI change, so data from getMinSignHeight is out of date, need to delay checking action
        setTimeout(() => {
            if (getMinSignHeight() <= signHeight) {
                setSignHeightError(false);
            } else {
                setSignHeightError(true);
            }
        }, 100);
    }

    const onChangeSignWidth = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSignWidth(Number(e.target.value));
    }

    const onChangeSignHeight = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (getMinSignHeight() <= Number(e.target.value)) {
            setSignHeight(Number(e.target.value));
            setSignHeightError(false);
        } else {
            setSignHeight(Number(e.target.value));
            setSignHeightError(true);
        }
    }

    const onChangeFontWeight = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFontWeight(Number(e.target.value));
    }

    const onChangeCharset = (e: SingleValue<{ value: number[][], label: string }>): void => {
        if (e !== null) {
            setCharset(e);

            createFontName();
        }
    }

    const onChangeSpaceWidth = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSpaceWidth(Number(e.target.value));
    }

    const onChangeFontImageName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFontImageName(e.target.value);
        setFontImageNameChanged(true);
    }

    const onChangeOtfontFileName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setOtfontFileName(e.target.value);
        setOtfontFileNameChanged(true);
    }

    const onChangeFontColor = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFontColor(e.target.value);
    }

    const onChangeAntialiasing = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAntialiasing(e.target.checked);
    }

    const onChangeTextStroke = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTextStroke(e.target.checked);
    }

    const onChangeTextStrokeSize = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTextStrokeSize(Number(e.target.value));
    }

    const onChangeTextStrokeColor = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTextStrokeColor(e.target.value);
    }

    const onChangeStrokeFill = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setStrokeFill(e.target.checked);
    }

    return (
        <div>
            <FlexContainer style={{ marginTop: 5 }}>
                <InputFile
                    text={ "Load font" }
                    accept={ ".ttf" }
                    multiple={ true }
                    icon={ faFileUpload }
                    onChange={ addFont }
                    width={ 120 }
                />
                <InputFile
                    text={ "Load font from folder" }
                    multiple={ true }
                    directory={ true }
                    icon={ faFolderPlus }
                    onChange={ addFont }
                    width={ 210 }
                />
                <CircleAnimationButton
                    icon={ <IconFA icon={ faBroom }/> }
                    text={ "Delete added fonts" }
                    width={ 190 }
                    color="steelPurple"
                    onClick={ clearAllAddedFonts }
                />
            </FlexContainer>

            <FlexContainer>
                <div>Font:</div>
                <Select
                    value={ fontName ? { value: fontName, label: fontName } : null }
                    isMulti={ false }
                    onChange={ onChangeFont }
                    options={ getFontListOptions(fontsList) }
                    styles={{
                        // @ts-ignore
                        container: (provided, state) => ({ ...provided, width: 300, height: 30 }),
                        // @ts-ignore
                        option: (provided, state) => ({ ...provided, color: '#000000' }),
                        // @ts-ignore
                        control: (provided, state) => ({ ...provided, minHeight: 20 }),
                        // @ts-ignore
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
                    value={ fontSize }
                    min={ 1 }
                    onChange={ onChangeFontSize }
                />
            </FlexContainer>

            <FlexContainer>
                <div>
                    Sign width:
                </div>
                <input
                    type="number"
                    style={{ width: 100 }}
                    value={ signWidth }
                    min={ 1 }
                    onChange={ onChangeSignWidth }
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
                        backgroundColor: signHeightError ? '#FF3366' : '#FFFFFF'
                    }}
                    value={ signHeight }
                    min={ 1 }
                    onChange={ onChangeSignHeight }
                />
            </FlexContainer>

            { signHeightError ? <div style={{ color: '#FF3366', marginTop: 5 }}>Real sign height is greater than the set height</div> : null }

            <FlexContainer>
                <div>
                    Font weight:
                </div>
                <input
                    type="number"
                    style={{ width: 100 }}
                    value={ fontWeight }
                    step={ 100 }
                    min={ 100 }
                    max={ 900 }
                    onChange={ onChangeFontWeight }
                />
            </FlexContainer>

            <FlexContainer>
                <div>
                    Charset:
                </div>
                <Select
                    value={ charset }
                    isMulti={ false }
                    onChange={ onChangeCharset }
                    options={ charsetOptions }
                    styles={{
                        // @ts-ignore
                        container: (provided, state) => ({ ...provided, width: 130, height: 30 }),
                        // @ts-ignore
                        option: (provided, state) => ({ ...provided, color: '#000000' }),
                        // @ts-ignore
                        control: (provided, state) => ({ ...provided, minHeight: 20 }),
                        // @ts-ignore
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
                    value={ spaceWidth }
                    min={ 1 }
                    onChange={ onChangeSpaceWidth }
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
                        border: fontImageNameChanged ? "3px solid #0099CC" : undefined
                    }}
                    value={ fontImageName }
                    onChange={ onChangeFontImageName }
                />
                <div>
                    <CircleAnimationButton
                        icon={ <IconFA icon={ faMagic }/> }
                        height={ 30 }
                        color={ "deepSea" }
                        text={ "Set automatically" }
                        width={ 170 }
                        onClick={ resetFontImageNameChanged }
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
                        border: otfontFileNameChanged ? "3px solid #0099CC" : undefined
                    }}
                    value={ otfontFileName }
                    onChange={ onChangeOtfontFileName }
                />
                <div>
                    <CircleAnimationButton
                        icon={ <IconFA icon={ faMagic }/> }
                        height={ 30 }
                        color={ "deepSea" }
                        text={ "Set automatically" }
                        width={ 170 }
                        onClick={ resetOtfontFileNameChanged }
                    />
                </div>
            </FlexContainer>

            <br/>

            <CircleAnimationButton
                icon={ <IconFA icon={ additionalOptions === false ? faTools : faTimesCircle }/> }
                alwaysVisibleText={ true }
                text={ additionalOptions === false ? "Open options" : "Close options" }
                width={ 150 }
                color={ additionalOptions === false ? "coralBlue" : "gray" }
                style={{ margin: "auto" }}
                onClick={ additionalOptions === false ? () => setAdditionalOptions(true) : () => setAdditionalOptions(false) }
            />

            { additionalOptions === true ?
                <div>
                    <FlexContainer>
                        <div>
                            Font color:
                        </div>
                        <input
                            type="color"
                            style={{ width: 100 }}
                            value={ fontColor }
                            onChange={ onChangeFontColor }
                        />
                    </FlexContainer>
                    <FlexContainer>
                        <div>
                            Antialiasing:
                        </div>
                        <input
                            type="checkbox"
                            defaultChecked={ antialiasing }
                            onChange={ onChangeAntialiasing }
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
                            defaultChecked={ textStroke }
                            onChange={ onChangeTextStroke }
                        />
                    </FlexContainer>

                    <FlexContainer>
                        <div>
                            Text stroke size:
                        </div>
                        <input
                            type="number"
                            style={{ width: 100 }}
                            value={ textStrokeSize }
                            min={ 0 }
                            step={ 0.1 }
                            onChange={ onChangeTextStrokeSize }
                        />
                    </FlexContainer>

                    <FlexContainer>
                        <div>
                            Text stroke color:
                        </div>
                        <input
                            type="color"
                            style={{ width: 100 }}
                            value={ textStrokeColor }
                            onChange={ onChangeTextStrokeColor }
                        />
                    </FlexContainer>

                    <FlexContainer>
                        <div>
                            Stroke fill:
                        </div>
                        <input
                            type="checkbox"
                            defaultChecked={ strokeFill }
                            onChange={ onChangeStrokeFill }
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
                    onClick={ download }
                />
                <CircleAnimationButton
                    icon={ <IconFA icon={ faFileCode }/> }
                    text={ "Download otfont file" }
                    width={ 200 }
                    color="springForest"
                    style={{ marginTop: 5, marginBottom: 5, marginRight: 5 }}
                    onClick={ generateOtfontFile }
                />
            </div>

            <br/>

            <div style={{ width: 'fit-content', margin: 'auto' }}>
                <TableWithSigns
                    fontFamily={ fontName }
                    fontSize={ fontSize }
                    signWidth={ signWidth }
                    signHeight={ signHeight }
                    fontWeight={ fontWeight }
                    charset={ charset.value }
                    fontColor={ fontColor }
                    antialiasing={ antialiasing }
                    textStroke={ textStroke }
                    textStrokeSize={ textStrokeSize }
                    textStrokeColor={ textStrokeColor }
                    strokeFill={ strokeFill }
                    divRef={ ref }
                />
            </div>

            <div style={{ marginTop: 10 }}>
                Trying to calculate the minimum sign height
            </div>

            <TestHeight
                fontFamily={ fontName }
                fontSize={ fontSize }
                signWidth={ signWidth }
                signHeight={ signHeight }
                fontWeight={ fontWeight }
                fontColor={ fontColor }
                antialiasing={ antialiasing }
                textStroke={ textStroke }
                textStrokeSize={ textStrokeSize }
                textStrokeColor={ textStrokeColor }
                strokeFill={ strokeFill }
                style={{ margin: 'auto', width: 'fit-content' }}
                ref={ testSignRef }
            />
        </div>
    );
}

export default Main;
