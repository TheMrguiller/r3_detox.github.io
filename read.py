import pandas as pd
import ast

if __name__ == "__main__":
    df = pd.read_csv("/home/111044@TRI.LAN/Documentos/website_r3detox/static/dataset/experiment_few_shot_7_results.csv")
    df = df[["sentence", "result", "paraphrase"]]
    df["result"] = df["result"].apply(ast.literal_eval)
    df["result"] = df["result"].apply(lambda x: x["reasoning"])
    df.rename(columns={"sentence": "original", "result": "reasoning"}, inplace=True)
    df = df.sample(n=100).reset_index(drop=True)
    list_of_dicts = df.to_dict(orient="records")
    with open("/home/111044@TRI.LAN/Documentos/website_r3detox/static/data/experiment_results.json", "w") as f:
        import json
        json.dump(list_of_dicts, f, indent=4)
    pass

