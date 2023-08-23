import { useCallback } from 'react';
import Dropzone from 'react-dropzone';
import Image from 'next/image';

interface DropzoneProps {
  label?: string;
  onChange: (value: any) => any;
  wrapperClassName?: string;
  labelClassName?: string;
  icon: any;
  value: string | null;
}

const DropzoneComponent = (props: DropzoneProps) => {
  const {
    label,
    onChange,
    wrapperClassName,
    labelClassName,
    icon,
    value,
  } = props;

  // const onDrop = useCallback((acceptedFiles: any) => {
  //   acceptedFiles.forEach((file: any) => {
  //     const reader = new FileReader()

  //     reader.onabort = () => console.log('file reading was aborted')
  //     reader.onerror = () => console.log('file reading has failed')
  //     reader.onload = () => {
  //     // Do whatever you want with the file contents
  //       const binaryStr = reader.result
  //       console.log(binaryStr)
  //     }
  //     reader.readAsArrayBuffer(file)
  //   })
    
  // }, [])

  const onDrop = useCallback((file: any) => {
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file[0]);
  }, [onChange])

  return (
  <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
    {({getRootProps, getInputProps}) => (
      <section className='h-full'>
        <div {...getRootProps()} className='border border-dashed border-gray-color mr-2 h-full rounded-xl'>
          <input {...getInputProps()} />
          <div className='h-full flex flex-col rounded-xl p-4 justify-center align-center text-center bg-cover bg-center'
            style={{
              backgroundImage: `url(${value})`,
            }}
          >
            {!value && <>
              <div className='flex justify-center'>{icon}</div>
              <p className="opacity-50 text-xl font-bold">{label}</p>
              <p className='h-fit opacity-50'>Drag &amp; drop image here,<br/>or click to select file<br/>(optional)</p>
            </>}
          </div>
        </div>
      </section>
    )}
  </Dropzone>
  )
}

export default DropzoneComponent