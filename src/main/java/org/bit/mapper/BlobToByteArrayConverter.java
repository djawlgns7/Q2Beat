package org.bit.mapper;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.IOException;

public class BlobToByteArrayConverter {

    public static byte[] convert(InputStream inputStream) throws IOException {
        if (inputStream == null) {
            return null;
        }
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        return outputStream.toByteArray();
    }
}
