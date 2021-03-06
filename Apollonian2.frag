// based on: apollonian2; https://www.shadertoy.com/view/llKXzh
#info -----------------------------------------------------------------------------
#info Spherical Inversion
#info Set [doInversion] checkbox to enable spherical inversion.
#info The companion controls [invX],[invY],[invZ],[invRadius] and [invAngle].
#info specify the inversion center point, radius and angle.
#info Apply Preset [Inv ON], or [Inv OFF] to load Settings to begin exploration.  

#include "MathUtils.frag"
#include "DE-Raytracer-XId.frag"

#define float3 vec3
#define float4 vec4

#group Apollonian2
uniform int MaxSteps; slider[1,20,20]
uniform float Multiplier; slider[1,10,300]
uniform float Foam; slider[0.005,0.1,0.15]
uniform float Foam2; slider[0.4,0.5,2]
uniform float Bend; slider[0.01,0.1,0.1]

uniform bool doInversion; checkbox[true]
uniform float invX; slider[-2,0,2]
uniform float invY; slider[-2,0,2]
uniform float invZ; slider[-2,0,2]
uniform float invRadius; slider[0.2,3,4]
uniform float invAngle; slider[-2,0,2]

float DE_APOLLONIAN2(float3 pos) {
    float t = Foam2 + 0.25 * cos(Bend * PI * Multiplier * (pos.z - pos.x));
    float scale = 1.0;
    
    for(int i=0; i< MaxSteps; ++i) {
        pos = -1.0 + 2.0 * fract(0.5 * pos + 0.5);
        pos -= sign(pos) * Foam;
        
        float k = t / dot(pos,pos);
        pos *= k;
        scale *= k;
        
        orbitTrap = min(orbitTrap, float4(abs(pos), dot(pos,pos)));
    }
    
    float d1 = sqrt( min( min( dot(pos.xy,pos.xy), dot(pos.yz,pos.yz) ), dot(pos.zx,pos.zx) ) ) - 0.02;
    float dmi = min(d1,abs(pos.y));
    return 0.5 * dmi / scale;
}

float DE(float3 pos) {
   if(doInversion) {
      float3 invCenter = float3(invX,invY,invZ);
      pos = pos - invCenter;
      float r = length(pos);
      float r2 = r*r;
      pos = (invRadius * invRadius / r2 ) * pos + invCenter;
      
      float an = atan(pos.y,pos.x) + invAngle;
      float ra = sqrt(pos.y * pos.y + pos.x * pos.x);
      pos.x = cos(an)*ra;
      pos.y = sin(an)*ra;
      
      float de = DE_APOLLONIAN2(pos);
      
      de = r2 * de / (invRadius * invRadius + r * de);
      return de;
   }
   
   return DE_APOLLONIAN2(pos);
}

#preset Inv OFF
FOV = 0.680351907
Eye = 5.85043894,5.28844217,-0.560062607
Target = -39.3724527,2.70864818,2.34483285
EquiRectangular = false
AutoFocus = false
FocalPlane = 2.37315875
Aperture = 0
Gamma = 1.4549483
ToneMapping = 2
Exposure = 1.44578313
Brightness = 1.52073733
Contrast = 2.04918033
AvgLumin = 0.5,0.5,0.5
Saturation = 3.25421133
LumCoeff = 0.212500006,0.715399981,0.0720999986
Hue = 0
GaussianWeight = 0
AntiAliasScale = 0
DepthToAlpha = false
ShowDepth = false
DepthMagnitude = 1
Detail = -4.09011627
DetailAO = -4.43333333
FudgeFactor = 0.63507109
MaxDistance = 108.333332
MaxRaySteps = 608
Dither = 1 Locked
NormalBackStep = 0 NotLocked
AO = 0,0,0,0.480190175
Specular = 0.078125
SpecularExp = 6.50684936
SpecularMax = 3.61445779
SpotLight = 1,1,1,0.257443083
SpotLightDir = -0.063545149,-0.842809364
CamLight = 1,1,1,0.39702234
CamLightMin = 0.098333334
Glow = 1,1,1,0.226753671
GlowMax = 62
Fog = 0
HardShadow = 0.225913621 NotLocked
ShadowSoft = 1.50250418
QualityShadows = false
Reflection = 0 NotLocked
DebugSun = false NotLocked
BaseColor = 1,1,1
OrbitStrength = 0.30555556
X = 0.5,0.6,0.6,0.433283359
Y = 1,0.6,0,-0.391304348
Z = 0.8,0.78,1,0.5922039
R = 0.4,0.7,1,0.909909911
BackgroundColor = 0.05882353,0.07843137,0.1019608
GradientBackground = 0
CycleColors = true
Cycles = 1.80470584
EnableFloor = false
FloorNormal = 0,0,1
FloorHeight = 0
FloorColor = 1,1,1
Up = -0.60048134,-0.84115524,0.03730446
EyeSeparation = 1.21506685
ProjectionPlane = 165.441177
AnaglyphLeft = 1,0,0
AnaglyphRight = 0,1,1
MaxSteps = 5
Multiplier = 1
Foam = 0.005
Foam2 = 0.94731824
Bend = 0.074579173
doInversion = false
invX = -1.28774929
invY = -0.159544159
invZ = -1.10541311
invRadius = 1.65090909
invAngle = -1.06807867
#endpreset

#preset Inv ON
FOV = 0.680351907
Eye = 2.8039559,2.88923189,-0.515025883
Target = -30.5512713,-27.8700781,0.708635458
EquiRectangular = false
AutoFocus = false
FocalPlane = 2.37315875
Aperture = 0
Gamma = 1.4549483
ToneMapping = 2
Exposure = 1.44578313
Brightness = 1.52073733
Contrast = 2.04918033
AvgLumin = 0.5,0.5,0.5
Saturation = 3.25421133
LumCoeff = 0.212500006,0.715399981,0.0720999986
Hue = 0
GaussianWeight = 0
AntiAliasScale = 0
DepthToAlpha = false
ShowDepth = false
DepthMagnitude = 1
Detail = -4.09011627
DetailAO = -4.43333333
FudgeFactor = 0.63507109
MaxDistance = 108.333332
MaxRaySteps = 608
Dither = 1 Locked
NormalBackStep = 0 NotLocked
AO = 0,0,0,0.480190175
Specular = 0.078125
SpecularExp = 6.50684936
SpecularMax = 3.61445779
SpotLight = 1,1,1,0.257443083
SpotLightDir = -0.063545149,-0.842809364
CamLight = 1,1,1,0.39702234
CamLightMin = 0.098333334
Glow = 1,1,1,0.226753671
GlowMax = 62
Fog = 0
HardShadow = 0.225913621 NotLocked
ShadowSoft = 1.50250418
QualityShadows = false
Reflection = 0 NotLocked
DebugSun = false NotLocked
BaseColor = 1,1,1
OrbitStrength = 0.30555556
X = 0.5,0.6,0.6,0.433283359
Y = 1,0.6,0,-0.391304348
Z = 0.8,0.78,1,0.5922039
R = 0.4,0.7,1,0.909909911
BackgroundColor = 0.05882353,0.07843137,0.1019608
GradientBackground = 0
CycleColors = true
Cycles = 1.80470584
EnableFloor = false
FloorNormal = 0,0,1
FloorHeight = 0
FloorColor = 1,1,1
Up = 0.545565655,-0.592408159,-0.020103478
EyeSeparation = 2.61846905
ProjectionPlane = 165.441177
AnaglyphLeft = 1,0,0
AnaglyphRight = 0,1,1
MaxSteps = 5
Multiplier = 1
Foam = 0.047860547
Foam2 = 0.609773536
Bend = 0.01579261
doInversion = true
invX = -0.94103488
invY = -0.05054148
invZ = -0.6377858
invRadius = 1.2643623
invAngle = -0.79181708
#endpreset
