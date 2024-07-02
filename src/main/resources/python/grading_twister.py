import sys
import urllib.parse
import Levenshtein

CHO = "ᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ"
JUNG = "ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ"
JONG = "ᆨᆩᆪᆫᆬᆭᆮᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸᆹᆺᆻᆼᆽᆾᆿᇀᇁᇂ"

def decompose_hangul(s):
    result = []
    for c in s:
        if '가' <= c <= '힣':
            code = ord(c) - ord('가')
            cho = code // 588
            jung = (code - (cho * 588)) // 28
            jong = (code - (cho * 588) - (jung * 28))
            result.append(CHO[cho])
            result.append(JUNG[jung])
            if jong != 0:
                result.append(JONG[jong - 1])
        else:
            result.append(c)
    return ''.join(result)

def calculate_similarity(s1, s2):
    decomposed_s1 = decompose_hangul(s1)
    decomposed_s2 = decompose_hangul(s2)
    distance = Levenshtein.distance(decomposed_s1, decomposed_s2)
    max_len = max(len(decomposed_s1), len(decomposed_s2))
    similarity = (1.0 - (distance / max_len)) * 100
    return similarity

if __name__ == "__main__":
    s1 = urllib.parse.unquote(sys.argv[1])
    s2 = urllib.parse.unquote(sys.argv[2])
    similarity = calculate_similarity(s1, s2)
    print(similarity)
