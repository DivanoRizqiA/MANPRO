import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler
from yellowbrick.cluster import KElbowVisualizer
from sklearn.cluster import KMeans
from sklearn.feature_selection import VarianceThreshold, SelectKBest, f_classif
from sklearn.preprocessing import StandardScaler, LabelEncoder
from matplotlib.colors import ListedColormap
from sklearn.feature_selection import RFE , f_regression
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.preprocessing import RobustScaler
from sklearn.metrics import f1_score
import joblib
# https://www.kaggle.com/datasets/ehababoelnaga/diabetes-dataset/data
df_train = pd.read_csv('dataset/Training.csv')
df_test = pd.read_csv('dataset/Testing.csv')
df_combined = pd.concat([df_train, df_test], ignore_index=True)
df_combined.info()
df_combined.describe()
# Ganti 0 dengan NaN di kolom yang tidak boleh bernilai 0
cols_to_replace = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
df_combined[cols_to_replace] = df_combined[cols_to_replace].replace(0, np.nan)
print(df_combined.isnull().sum())
df_cleaned = df_combined.dropna()
print(df_cleaned.isnull().sum())
df = df_cleaned
df.info()
numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns
print(f"Kolom numerik yang akan divisualisasikan: {numeric_cols}")

plt.figure(figsize=(15, 10))
n_cols = len(numeric_cols)
n_rows = (n_cols + 1) // 2

for i, col in enumerate(numeric_cols, 1):
    plt.subplot(n_rows, 2, i)
    sns.histplot(df[col], bins=20, kde=True, color='skyblue')
    plt.title(f'Distribusi {col}', fontsize=12)
    plt.xlabel(col, fontsize=10)
    plt.ylabel('Frekuensi', fontsize=10)

plt.tight_layout()
plt.show()
corr_matrix = df.corr()

# Plot heatmap
plt.figure(figsize=(10, 8))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5)
plt.title('Heatmap Korelasi Antar Fitur Diabetes')
plt.xticks(rotation=45)
plt.yticks(rotation=0)
plt.tight_layout()
plt.show()
def remove_outliers_iqr(data):
    Q1 = data.quantile(0.25)
    Q3 = data.quantile(0.75)
    IQR = Q3 - Q1
    mask = ~((data < (Q1 - 1.5 * IQR)) | (data > (Q3 + 1.5 * IQR))).any(axis=1)
    return data[mask]
# Normalisasi data utk outlier
X = df.drop("Outcome", axis=1)
y = df["Outcome"]
data_clean = remove_outliers_iqr(pd.concat([X, y], axis=1))

# Pisahkan kembali
X_clean = data_clean.drop("Outcome", axis=1)
y_clean = data_clean["Outcome"]
X_log = X_clean.copy()
cols_to_log = ["Insulin", "DiabetesPedigreeFunction", "Age", "Pregnancies"]

for col in cols_to_log:
    X_log[col] = np.log1p(X_log[col])

scaler = RobustScaler()
X_scaled = scaler.fit_transform(X_log)
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_clean, test_size=0.2, random_state=42
)
model = LogisticRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print("Akurasi:", accuracy_score(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))

joblib.dump(scaler, 'robust_scaler.pkl')
joblib.dump(model, 'logreg_model.pkl')
scaler = joblib.load("saved_model/robust_scaler.pkl")
model = joblib.load("saved_model/logreg_model.pkl")
user_input = pd.DataFrame([
    {'Pregnancies': 3, 'Glucose': 78, 'BloodPressure': 50, 'SkinThickness': 32, 'Insulin': 88, 'BMI': 31.0, 'DiabetesPedigreeFunction': 0.848, 'Age': 26},
    {'Pregnancies': 1, 'Glucose': 165, 'BloodPressure': 69, 'SkinThickness': 8,  'Insulin': 68, 'BMI': 23.9, 'DiabetesPedigreeFunction': 0.66,  'Age': 22},
    {'Pregnancies': 5, 'Glucose': 115, 'BloodPressure': 72, 'SkinThickness': 35, 'Insulin': 130, 'BMI': 36.2, 'DiabetesPedigreeFunction': 0.35, 'Age': 40},
    {'Pregnancies': 0, 'Glucose': 92, 'BloodPressure': 60, 'SkinThickness': 28, 'Insulin': 0,  'BMI': 28.5, 'DiabetesPedigreeFunction': 0.2,   'Age': 19},
    {'Pregnancies': 4, 'Glucose': 180, 'BloodPressure': 85, 'SkinThickness': 29, 'Insulin': 150, 'BMI': 34.3, 'DiabetesPedigreeFunction': 1.2, 'Age': 33},
])

# Transformasi log untuk beberapa kolom
cols_to_log = ["Insulin", "DiabetesPedigreeFunction", "Age", "Pregnancies"]
for col in cols_to_log:
    user_input[col] = np.log1p(user_input[col])
user_input_scaled = scaler.transform(user_input)
probs = model.predict_proba(user_input_scaled)

for i, p in enumerate(probs):
    print(f"Data ke-{i+1} -> Probabilitas Tidak Diabetes (0): {p[0]*100:.2f}%, Diabetes (1): {p[1]*100:.2f}%")

