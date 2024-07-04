import speech_recognition as sr

def recognize_speech_from_file(file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(file_path) as source:
        audio = recognizer.record(source)
        try:
            return recognizer.recognize_google(audio)
        except sr.UnknownValueError:
            return "Could not understand audio"
        except sr.RequestError:
            return "Could not request results; check your network connection"

if __name__ == "__main__":
    import sys
    file_path = sys.argv[1]
    print(recognize_speech_from_file(file_path))
