package org.bit.util;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GooglePublicKeysManager;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

public class GoogleIdTokenVerifierUtil {
    private static final String CLIENT_ID = "975411602786-m61p0e7053pnrpi7j4gl92ftmdpjkj8u.apps.googleusercontent.com";
    private static final NetHttpTransport transport = new NetHttpTransport();
    private static final JacksonFactory jsonFactory = new JacksonFactory();
    private static final String GOOGLE_CERTS_URL = "https://www.googleapis.com/oauth2/v3/certs";

    private static final GooglePublicKeysManager publicKeysManager = new GooglePublicKeysManager.Builder(transport, jsonFactory)
            .setPublicCertsEncodedUrl(GOOGLE_CERTS_URL)
            .build();

    public static GoogleIdToken verifyToken(String idTokenString) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(publicKeysManager)
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();
        return verifier.verify(idTokenString);
    }
}
